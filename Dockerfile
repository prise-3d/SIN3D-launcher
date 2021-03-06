FROM python

COPY . /usr/src/app
WORKDIR /usr/src/app

# Server port
EXPOSE 8000

RUN apt-get update

# update project source code if necessary (use by default https protocol)
RUN git remote set-url origin https://github.com/prise-3d/SIN3D-launcher.git
RUN git pull origin master

# Install dependencies and prepare project
RUN python --version
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate

# only comment in case it will be necessary
RUN echo $WEB_PREFIX_URL
RUN WEB_PREFIX_URL=$WEB_PREFIX_URL

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]