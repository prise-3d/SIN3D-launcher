# main imports
import base64
import json
import re
import argparse
import sys, os
import requests

# modules imports
sys.path.insert(0, '') # trick to enable import of main folder module

# config imports
import links.config  as cfg


def encode_data(data):
    json_data = json.dumps(data)
    link_data = base64.b64encode(str(json_data).encode('utf-8'))
    
    return link_data


def main():
    # getting all scenes available name
    scenes_list_url = cfg.default_host + '/api/listScenes'
    res = requests.get(scenes_list_url)
    data = json.loads(res.content)
    scenes_name = data['data']

    # getting all params
    parser = argparse.ArgumentParser(description="Compute links for scenes of experiment")

    parser.add_argument('--host', type=str, help='hostname choosen', default=cfg.default_host)
    parser.add_argument('--experiment', type=str, help="experiment name to use", choices=cfg.experiment_list, required=True)
    parser.add_argument('--experimentId', type=str, help="experiment id to use")
    parser.add_argument('--scenes', type=str, help="scene name list from %s" % scenes_name)
    parser.add_argument('--output', type=str, help="output filename", required=True)

    args = parser.parse_args()

    p_host          = args.host
    p_experiment    = args.experiment
    p_experiment_id = args.experimentId
    p_scenes        = args.scenes.split(',')
    p_output        = args.output

    # generate link for each scene

    links = []
    for scene in p_scenes:

        data = {
            'hostConfig': p_host,
            'experimentId': p_experiment_id,
            'experimentName': p_experiment,
            'sceneName': scene
        }

        generated_link_info = encode_data(data)
        generated_link = p_host + '/#/?q=' + bytes(generated_link_info).decode("utf-8")
        links.append(generated_link)

    filename_path = os.path.join(cfg.links_data_folder, p_output)

    if not os.path.exists(cfg.links_data_folder):
        os.makedirs(cfg.links_data_folder)

    with open(filename_path, 'w') as f:

        for id, link in enumerate(links):
            f.write(p_scenes[id] + ';' + p_experiment + ';' + p_experiment_id + ';' + link + '\n')

    print("Links are saved into.. %s" % filename_path)

if __name__== "__main__":
    main()