# SIN3D-launcher

## Description

Project for generating users links in order to launch SIN3D application quickly during experiment.

## Requirements

```
pip install -r requirements.txt
```

## How to use ?


Generate user links (file saved into `data` folder):
```sh
python links/generate/generate_experiment_link.py --experiment AreSameImagesRandom --experimentId expe1 --scenes Appart1opt02,Bureau1,Cendrier --output expe1.csv
```

Generate experiment links for each user (file saved into `expe` folder):
```sh
python links/generate/generate_experiment.py --data data/expe1.csv --scenes 2 --users 150 --userId 1 --output expe1_user_links.csv
```

The final file is generated and contains data just as follow:

```
link1;link2;...;linkN
...
link2;link3;...;linkN
```

## Launch WebApp

```
python manage.py migrate
```

```
python manage.py runserver
```

## Licence

[The MIT license](LICENSE)