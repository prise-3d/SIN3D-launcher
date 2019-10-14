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

import config  as cfg


def main():

    parser = argparse.ArgumentParser(description="Compute specific dataset for model using of metric")

    parser.add_argument('--data', type=str, help='data links to use', required=True)
    parser.add_argument('--scenes', type=int, help="number of scenes", required=True)
    parser.add_argument('--users', type=int, help="number of users of experiment", required=True)
    parser.add_argument('--output', type=str, help="output filename of user links", required=True)

    args = parser.parse_args()

    p_data          = args.data
    p_scenes        = args.scenes
    p_users         = args.users
    p_output        = args.output

    # generate link for each scene
    with open(p_data, 'r') as f:
        lines = f.readlines()
        lines = [l.replace('\n', '') for l in lines]
        
        nb_elements = len(lines)

        # check if number of scenes is higher than number of elements in data links
        if p_scenes > nb_elements:
            p_scenes = nb_elements

        # open output filename
        filename_path = os.path.join(cfg.expe_data_folder, p_output)

        if not os.path.exists(cfg.expe_data_folder):
            os.makedirs(cfg.expe_data_folder)

        output_f = open(filename_path, 'w')

        for _ in range(p_users):

            user_links = random.choices(lines, k=p_scenes)

            # generate output line
            output_line = ""
            for link in user_links:
                output_line += link + ';'
            output_line += '\n'

            output_f.write(output_line)
            output_f.flush()
        
        output_f.close()

        print("Experiment generated output file is saved into.. %s" % filename_path)


if __name__== "__main__":
    main()