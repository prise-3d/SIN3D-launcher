# SIN3D-launcher

## Description

Project for generating users links in order to launch SIN3D application quickly during experiment.

## How to use ?


Generate user links (file saved into `data` folder):
```sh
python generate/generate_experiment_link.py --experiment AreSameImagesRandom --experimentId expe1 --scenes Appart1opt02,Bureau1,Cendrier --output expe1.csv
```

Generate experiment links for each user (file saved into `expe` folder):
```sh
python generate/generate_experiment.py --data data/expe1.csv --scenes 2 --users 150 --output expe1_user_links.csv
```

The final file is generated and contains data just as follow:

```
link1;link2;...;linkN
...
link2;link3;...;linkN
```

## Licence

[The MIT license](LICENSE)