# SIN3D-launcher

## Description

Project for generating users links in order to launch SIN3D application quickly during experiment.

## How to use ?


Generate user links (file saved into `data` folder):
```sh
python links/generate/generate_experiment_link.py --experiment AreSameImagesRandom --experimentId expe1 --scenes Appart1opt02,Bureau1,Cendrier --output expe1.csv
```

Generate experiment links for each user (file saved into `expe` folder):
```sh
python links/generate/generate_experiment.py --data data/expe1.csv --scenes 2 --users 150 --userId 1 --output expe1_user_links.csv
```

- `userId`: tell if an userId is used or not (use of index of line from generated output file)

The final file is generated and contains data just as follow:

```
0;sceneName1:::link1;sceneName2:::link2;...;sceneNameN:::linkN
...
N;sceneName2:::link2;sceneName3:::link3;...;sceneNameN:::linkN
```

## Launch WebApp

### 1. Manually

```
pip install -r requirements.txt
```

```
python manage.py migrate
```

```
python manage.py runserver
```

### 2. Using docker (recommended)

You can use make commands:

```
make build
```

```
make run
```

Or simply:

```
make deploy
```

Will run `build` and `run` commands at once.

You also have `stop`, `remove`, `clean` commands:
- `stop`: stop current container instance if exists
- `remove`: stop and remove container instance if exists
- `clean`: remove docker image if exists

### 3. Notes

Configure your own URL prefix using `WEB_PREFIX_URL`:

```
WEB_PREFIX_URL=experiments python manage.py runserver
```

or using docker:

```
WEB_PREFIX_URL=experiments make deploy
```

## Licence

[The MIT license](LICENSE)