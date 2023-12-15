#!/bin/bash

git pull
pip install pipenv
pipenv install
open http://localhost:3030
pipenv run python3 app.py