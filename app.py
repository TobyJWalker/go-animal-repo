from flask import Flask, render_template, redirect, url_for, request
from lib.models import *
from werkzeug.utils import secure_filename
import os, signal
from jinja_markdown import MarkdownExtension
import json
from PIL import Image
import base64
from threading import Thread

# create flask app and db tables
app = Flask(__name__, static_url_path='/static')
create_db_tables()

# add markdown support
app.jinja_env.add_extension(MarkdownExtension)

# upload folder and image extensions
UPLOAD_FOLDER = 'images/animals'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# make animals folder if note exists
if not os.path.exists('static/images/animals'):
    os.mkdir('static/images/animals')

@app.route('/')
def index():
    # get all animals from the database
    animals = Animal.select()

    # split into rows of 4
    animals = [animals[i:i+4] for i in range(0, len(animals), 4)]

    return render_template('index.html', animals=animals)

@app.route('/quit')
def quit():
    os.kill(os.getpid(), signal.SIGINT)

@app.route('/animals/<int:animal_id>')
def animal(animal_id):
    # get the animal from the database
    animal = Animal.get(Animal.id == animal_id)

    # get the notes for the animal
    notes = Notes.select().where(Notes.animal == animal)

    return render_template('animal.html', animal=animal, notes=notes)

@app.route('/animals/add', methods=['POST'])
def add_animal():
    # get the form data
    name = request.form['animal-name']
    breed = request.form['animal-breed']
    dob = request.form['animal-birthdate']

    # create the animal
    animal = Animal.create(name=name, breed=breed, dob=dob)

    return redirect(url_for('index'))

@app.route('/animals/<animal_id>/edit', methods=['PATCH'])
def edit_animal(animal_id):
    # get the animal from the database
    animal = Animal.get(Animal.id == animal_id)

    # get the form data
    data = json.loads(request.data)

    # update the animal
    animal.name = data['name']
    animal.breed = data['breed']
    animal.dob = data['dob']
    animal.species = data['species']
    animal.group = data['group']
    animal.description = data['description']
    animal.save()

    return '200'

@app.route('/animals/<animal_id>/delete', methods=['DELETE'])
def delete_animal(animal_id):
    # get the animal from the database
    animal = Animal.get(Animal.id == animal_id)

    # delete the animal
    animal.delete_instance()

    return '200'

@app.route('/animals/<animal_id>/notes/add', methods=['POST'])
def add_note(animal_id):
    # get the animal from the database
    animal = Animal.get(Animal.id == animal_id)

    # get the form data
    note = request.form['note']

    # create the note
    note = Notes.create(animal=animal, note=note)

    return redirect(url_for('animal', animal_id=animal_id))

@app.route('/notes/delete/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    # get the note from the database
    note = Notes.get(Notes.id == note_id)

    # delete the note
    note.delete_instance()

    return '200'

@app.route('/animals/<animal_id>/image', methods=['POST'])
def add_image(animal_id):
    # get the animal from the database
    animal = Animal.get(Animal.id == animal_id)

    # get the image data
    image = request.files.get('file', None)

    if image != None and allowed_file(image.filename):
        folder_name = animal_id
        if not os.path.exists(f'static/{UPLOAD_FOLDER}/{folder_name}'):
            os.mkdir(f'static/{UPLOAD_FOLDER}/{folder_name}')
            
        Thread(target=process_img, args=(image,folder_name,)).start()
        secure_url = f'{UPLOAD_FOLDER}/{folder_name}/{secure_filename(image.filename)}'
    else:
        secure_url = 'images/placeholder.jpeg'

    animal.img_url = secure_url
    animal.save()

    return redirect(url_for('animal', animal_id=animal_id))

# check if an uploaded image is an actual image file
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_img(image, folder):
    secure_url = f'static/{UPLOAD_FOLDER}/{folder}/{secure_filename(image.filename)}'

    with open(secure_url, 'wb') as file:
        file.write(image.read())

    pil_image = Image.open(secure_url)
    pil_image.thumbnail((500, 500))
    pil_image.save(secure_url)


if __name__ == '__main__':
    app.run(debug=True, port=3030)