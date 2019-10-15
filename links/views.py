# django imports
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404

# main imports
import os


def list_files(request):

    # get param 
    # TODO : implement view which list all expe links file

    data = {

    }

    return render(request, 'links/files.html', data)





