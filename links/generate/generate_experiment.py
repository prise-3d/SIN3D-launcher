# main imports
import base64
import json
import re
import argparse
import sys, os
import requests
import random

# modules imports
sys.path.insert(0, '') # trick to enable import of main folder module

# config imports
import links.config  as cfg


def decoded_data(data):
    decoded_data = str(base64.b64decode(data), "utf-8")

    return decoded_data


def encode_data(data):
    json_data = json.dumps(data)
    link_data = base64.b64encode(str(json_data).encode('utf-8'))
    
    return link_data


def extract_data(line):

    data = line.replace('\n', '').split(';')

    return (data[0], data[-1])


def main():

    parser = argparse.ArgumentParser(description="Compute experiment data")

    parser.add_argument('--data', type=str, help='data links to use', required=True)
    parser.add_argument('--scenes', type=int, help="number of scenes", required=True)
    parser.add_argument('--users', type=int, help="number of users of experiment", required=True)
    parser.add_argument('--userId', type=int, help="tell if user identifier is used or not", required=False, default=0)
    parser.add_argument('--output', type=str, help="output filename of user links", required=True)

    args = parser.parse_args()

    p_data          = args.data
    p_scenes        = args.scenes
    p_users         = args.users
    p_userId        = bool(args.userId)
    p_output        = args.output

    print(p_userId)

    # generate link for each scene
    with open(p_data, 'r') as f:
        lines = f.readlines()
        data_lines = [extract_data(l) for l in lines]
        
        nb_elements = len(lines)

        # check if number of scenes is higher than number of elements in data links
        if p_scenes > nb_elements:
            p_scenes = nb_elements

        # open output filename
        filename_path = os.path.join(cfg.expe_data_folder, p_output)

        if not os.path.exists(cfg.expe_data_folder):
            os.makedirs(cfg.expe_data_folder)

        output_f = open(filename_path, 'w')

        for i in range(p_users):
            
            scene_links = random.sample(data_lines, k=p_scenes)

            # generate output line
            output_line = str(i) + ';' 
            for scene_name, link in scene_links:

                if p_userId:
                    data = link.split('?q=')

                    hostname = data[0]
                    link_data = data[1]

                    # decode and add user id link if asked
                    decoded_data_link = decoded_data(link_data)
                    json_data = json.loads(decoded_data_link)
                    json_data['userId'] = str(i)
                    encoded_data_link = encode_data(json_data)
                    new_link = hostname + '?q=' + str(encoded_data_link, "utf-8")

                    # add new link
                    output_line += scene_name + ':::' + new_link + ';'
                else:
                    output_line += scene_name + ':::' + link + ';'


            output_line += '\n'

            output_f.write(output_line)
            output_f.flush()
        
        output_f.close()

        print("Experiment generated output file is saved into.. %s" % filename_path)


if __name__== "__main__":
    main()