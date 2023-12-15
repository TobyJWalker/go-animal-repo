import peewee
import os

# make data folder if not existing
if not os.path.exists('data'):
    os.mkdir('data')

db = peewee.SqliteDatabase('data/database.sqlite')

class Animal(peewee.Model):
    name = peewee.CharField()
    breed = peewee.CharField()
    species = peewee.CharField(default='n/a')
    dob = peewee.DateField()
    group = peewee.CharField(default='n/a')
    description = peewee.TextField(default='Nothing is added here yet...')
    img_url = peewee.CharField(default='images/placeholder.jpeg')


    class Meta:
        database = db
        table_name = 'animals'

class Notes(peewee.Model):
    animal = peewee.ForeignKeyField(Animal, backref='notes')
    note = peewee.TextField()

    class Meta:
        database = db
        table_name = 'notes'


def create_db_tables():
    with db:
        db.create_tables([Animal, Notes])