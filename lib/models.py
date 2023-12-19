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
    height = peewee.CharField(default='n/a')
    weight = peewee.CharField(default='n/a')
    colour = peewee.CharField(default='n/a')
    personality = peewee.CharField(default='n/a')
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