# Micro800 I/O Implementation Tool

This tool allows Micro800 developers assign aliasing tags to digital inputs and outputs for the Allen-Bradley Micro800
series programmable logic controllers (PLCs). The software used to program the Micro800 line is Connected Components
Workbench, and this repo is tested using v12.

The user can configure the names of the aliasing tags and whether or not "simulation" tags are needed. These simulation 
tags can be used to simulate discrete input signals or drive discrete output signals for development and testing purposes.

The configuration set by the developer is used to generate a text-based ladder logic representation that can be seemlessly
copied and pasted into the CCW development environment. Additionally, the tags needed to implement the generated ladder logic
can also be generated with this program.

## How to Use the Program

You will need to run this as localhost for now on port 8000 (http://localhost:8000). The code is written in Python utilizing
the Django web framework. You will need to install Python 3 and run pip install to install Django.

Install Python 3:           https://www.python.org/downloads/ 

Run Django installation:    pip install Django

This repo is a module, which can be "plugged into" an existing Django project. There are some modifications you will need to
do in order to get it to work:
1. Add micro800_io to the INSTALLED_APPS list:  'micro800_io.apps.Micro800IoConfig'
2. Add the necessary URL in urls.py:            path('micro800/', include('micro800_io.urls')),

Once those are added, create a super user using the following and fill in the details:
python manage.py createsuperuser

Then, make the migrations:
python manage.py makemigrations
python manage.py migrate

It's also important to fill the database with the necessary controller information. The project is set up with a URL endpoint
that takes care of this.

To populate controller information, use:
http://localhost:8000/micro800/insert_controllers

Only visit the URL once, then check the database to make sure it was populated at http://localhost:8000/admin

If you need to migrate again, use the lines above to do it.

## Supported Micro800 PLCs

|Micro810            |   DI  |   DO  |
|--------------------|-------|-------|
|2080-LC10-12AWA     |   8   |   4   |
|2080-LC10-12DWD     |   8   |   4   |
|2080-LC10-12QBB     |   8   |   4   |
|2080-LC10-12QWB     |   8   |   4   |


|Micro820            |   DI  |   DO  |
|--------------------|-------|-------|
|2080-LC20-20AWB     |   8   |   7   |
|2080-LC20-20QBB     |   12  |   7   |
|2080-LC20-20QWB     |   12  |   7   |

|Micro830            |   DI  |   DO  |
|--------------------|-------|-------|
|2080-LC30-10QVB     |   6   |   4   |
|2080-LC30-10QWB     |   6   |   4   |
|2080-LC30-16AWB     |   10  |   6   |
|2080-LC30-16QVB     |   10  |   6   |
|2080-LC30-16QWB     |   10  |   6   |
|2080-LC30-24QBB     |   14  |   10  |
|2080-LC30-24QVB     |   14  |   10  |
|2080-LC30-24QWB     |   14  |   10  |
|2080-LC30-48AWB     |   28  |   20  |

|Micro850            |   DI  |   DO  |
|--------------------|-------|-------|
|2080-LC50-24AWB     |   14  |   10  |
|2080-LC50-24QBB     |   14  |   10  |
|2080-LC50-24QVB     |   14  |   10  |
|2080-LC50-24QWB     |   14  |   10  |
|2080-LC50-48AWB     |   28  |   20  |
|2080-LC50-48QBB     |   28  |   20  |
|2080-LC50-48QVB     |   28  |   20  |
|2080-LC50-48QWB     |   28  |   20  |
|2080-LC50-48QWB-SIM |   28  |   20  |
