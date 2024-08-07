"""Getting API data from Ravelry for yarn stash exchange and seeding database"""
from flask import Flask, render_template, request, jsonify

from pprint import pformat, pprint
import requests
import os
import json
import re

import crud as crud
from model import connect_to_db, db
from server import app

os.system("dropdb yarn_exchange")
os.system("createdb yarn_exchange")

connect_to_db(app)
app.app_context().push()
db.create_all()


app = Flask(__name__)

R_USERNAME = os.environ['R_USERNAME']
R_PASSWORD = os.environ['R_PASSWORD']

auth_params = (R_USERNAME, R_PASSWORD)
payload = {
    "stash-status":"trade",
    "page_size":"100"
}
url ="https://api.ravelry.com/stash/search.json?query"

res = requests.get(url, params = payload, auth = auth_params)


stashes = res.json()["stashes"]

yarn_ID = stashes[1]["id"]

yarns_in_db = []
for yarn in stashes:
    yarn_ID = yarn["id"]
    rav_username = yarn["user"]["username"]
    user_url = f"https://api.ravelry.com//people/{rav_username}.json"
    user_data = requests.get(user_url, auth = auth_params)
    user_location = user_data.json()["user"].get("location", "")
    yarn_url = f"https://api.ravelry.com//people/{rav_username}/stash/{yarn_ID}.json"
    yarn_data = requests.get(yarn_url, auth = auth_params)
    yarn_JSON_data = yarn_data.json()["stash"]
    notes_html = yarn_JSON_data.get("notes", "")
    if notes_html != None:
    # pprint(yarn_JSON_data) 
        if "$" in notes_html:
            seller_name = rav_username
            seller_location = user_location
            yarn_price = re.search(r"\$[0-9]+", notes_html).group()
            yarn_price = int(yarn_price[1:])
            yarn_name = yarn_JSON_data["name"]
            yarn_weight = yarn_JSON_data["yarn_weight_name"]
            yarn_skeins = yarn_JSON_data["packs"][0]["skeins"]
            yarn_company = yarn_JSON_data.get("yarn",{}).get("yarn_company", {}).get("name", "")
            dye_lot = yarn_JSON_data["dye_lot"]
            yarn_photo_data = yarn_JSON_data["photos"]
            if len(yarn_photo_data) !=0:
                    yarn_photo = yarn_photo_data[0]["medium2_url"]
            else:
                    yarn_photo = ''
            # print(yarn_name, yarn_price, yarn_weight, yarn_company, yarn_skeins, dye_lot, yarn_photo, seller_name, seller_location)       
            seller_exists = crud.get_seller_by_Rav_name(seller_name)
            if seller_exists == None:
                seller = crud.create_seller(seller_name, seller_location)
                db.session.add(seller)
                db.session.commit()
            else:
                seller = seller_exists
            yarn = crud.create_yarn(yarn_name, yarn_price, yarn_photo, yarn_skeins, yarn_company, yarn_weight, dye_lot, seller)
            # clean up so that data isn't called before the crud function
            db.session.add(yarn)
            db.session.commit()


    

for n in range(10):
    email = f'user{n}@test.com'  # Voila! A unique email!
    password = 'test'
    user_in_db = crud.create_user(email, password)
    db.session.add(user_in_db)
db.session.commit()