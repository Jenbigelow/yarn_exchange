"""Script to seed database."""

import os
import json

import crud
from model import connect_to_db, db
from server import app
from api import yarn_data

os.system("dropdb yarn_exchange")
os.system("createdb yarn_exchange")

connect_to_db(app)
app.app_context().push()
db.create_all()

yarns_for_sale = []
