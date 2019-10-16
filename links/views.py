# django imports
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404

# main imports
import os
import json

from . import config  as cfg


def get_base_data(expe_name=None):
    '''
    Used to store default data to send for each view
    '''
    data = {}

    data['BASE'] = settings.WEB_PREFIX_URL

    return data


def list_files(request):

    # get param 
    # TODO : implement view which list all expe links file

    experiment_path = cfg.expe_data_folder

    files = []

    if os.path.exists(experiment_path):
        files = sorted(os.listdir(experiment_path))

    data = get_base_data()
    data['folder'] = files

    return render(request, 'links/files.html', data)


def user_links(request):

    filename = request.GET.get('filename')

    if filename is None:
        # send 404 error
        raise Http404("Page does not exist")
    
    filepath = os.path.join(cfg.expe_data_folder, filename)

    if not os.path.exists(filepath):
        # send 404 error
        raise Http404("File asked does not exist")

    # read data and send it
    with open(filepath, 'r') as f:
        lines = [l.replace('\n', '') for l in f.readlines()]

    links = {}
    for line in lines:
        data = line.split(';')
        links[data[0]] = data[1:]
    
    data = get_base_data()
    data['links'] = json.dumps(links)
    
    return render(request, 'links/links.html', data)





