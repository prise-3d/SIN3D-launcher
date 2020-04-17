# django imports
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import Http404

# main imports
import os
import json
import base64

# db imports
from pymongo import MongoClient

# generate mongo db connection and let access to collection
connection = MongoClient()

db = connection['sin3d']
contributors_collection = db['sin3d-contributors']
configurations_collection = db['sin3d-configuration']

def encode_data(data):
    json_data = json.dumps(data)
    link_data = base64.b64encode(str(json_data).encode('utf-8'))
    
    return link_data

def generate_link(data):
    # generate custom link
    generated_link_info = encode_data(data)
    generated_link = data['hostConfig'] + '/#/?q=' + bytes(generated_link_info).decode("utf-8")

    return generated_link

def get_base_data(expe_name=None):
    '''
    Used to store default data to send for each view
    '''
    data = {}

    data['BASE'] = settings.WEB_PREFIX_URL

    return data


def load_index(request):
    '''
    Prepare data information for main page
    - experiment identifiers available from configuration
    '''

    data = {}

    # get all configurations
    configurations = configurations_collection.find()
    
    data['configurations'] = {}

    for config in configurations:
        
        guild_id = config['guild_id']
        experiment_id = config['config']['experimentId']

        data['configurations'][guild_id] = experiment_id

    return render(request, 'links/index.html', data)

def check_user_id(request):

    data = {'status': True, 'message': None}

    if request.method == 'POST':
        
        form_input = json.loads(request.body)

        guild_id = form_input['guildId']
        user_id = form_input['userId']

        # check guild id 

        if len(user_id) > 5:
            guild = configurations_collection.find_one({'guild_id': int(guild_id)})

            if ' ' in user_id:
                data['message'] = 'Space character is not authorized'
                data['status'] = False
            elif guild is None:
                data['message'] = 'Experiment identifier does not exist'
                data['status'] = False
            else:
                user_account = contributors_collection.find_one({'guild_id': int(guild_id), 'user_id': user_id})

                if user_account is not None:
                    # create user link
                    data['message'] = 'User identifier already used'
                    data['status'] = False
                else:
                    # user already exists
                    data['message'] = 'Valid user identifier'
                    data['status'] = True
        else:
            data['message'] = 'User identifier need at least 6 characters'
            data['status'] = False

    return HttpResponse(json.dumps(data), content_type='application/json')

def generate_user_link(request):
    '''
    Generate link is possible for user, otherwise send an issue with error code
    '''

    data = {'status': False}
    # create link and add it to local storage of navigator
    if request.method == 'POST':

        form_input = json.loads(request.body)

        guild_id = form_input['guildId']
        user_id = form_input['userId']

        if len(user_id) > 5 and ' ' not in user_id:
            guild_config = configurations_collection.find_one({'guild_id': int(guild_id)})

            if guild_config is not None:

                user_account = contributors_collection.find_one({'guild_id': int(guild_id), 'user_id': user_id})
                print(user_account)

                if user_account is None:
                    # we can create link and save it
                    user_config = guild_config['config']
                    user_config['userId'] = user_id

                    contributors_collection.insert_one({
                        'user_id': user_id, 
                        'username': user_id, 
                        'guild_id': guild_config['guild_id'], 
                        'guild_name': guild_config['guild_name'], 
                        'discord': False, 
                        'config': user_config
                    })

                    data['config'] = user_config
                    data['link'] = generate_link(user_config)
                    data['status'] = True
                    data['message'] = 'Your experiment link was generated'
            else:
                data['message'] = 'Experiment link already generated'
        else:
            data['message'] = 'Invalid experiment id or user id'

    return HttpResponse(json.dumps(data), content_type='application/json')
