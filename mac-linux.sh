#!/bin/bash

git pull
pip install pipenv
pipenv install
pipenv run python3 app.py