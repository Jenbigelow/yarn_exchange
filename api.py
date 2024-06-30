"""Getting API data from Ravelry for yarn stash exchange."""
from flask import Flask, render_template, request, jsonify

from pprint import pformat, pprint
import requests
import os
import json
import re

app = Flask(__name__)

R_USERNAME = os.environ['R_USERNAME']
R_PASSWORD = os.environ['R_PASSWORD']

auth_params = (R_USERNAME, R_PASSWORD)
payload = {
    "stash-status":"trade"
}
url ="https://api.ravelry.com/stash/search.json?query"

res = requests.get(url, params = payload, auth = auth_params)


stashes = res.json()["stashes"]

yarn_ID = stashes[1]["id"]

total_yarn_data = {}
for yarn in stashes:
    yarn_ID = yarn["id"]
    rav_username = yarn["user"]["username"]
    user_url = f"https://api.ravelry.com//people/{rav_username}/stash/{yarn_ID}.json"
    yarn_data = requests.get(user_url, auth = auth_params)
    yarn_JSON_data = yarn_data.json()["stash"]
    notes_html = yarn_JSON_data["notes"]
    # pprint(yarn_JSON_data) 
    if "$" in notes_html:
        yarn_price = re.search(r"[0-9]+", notes_html).group()
        yarn_price = int(yarn_price)
        yarn_name = yarn_JSON_data["name"]
        yarn_weight = yarn_JSON_data["yarn_weight_name"]
        yarn_skeins = yarn_JSON_data["packs"][0]["skeins"]
        # yarn_company = yarn_JSON_data["yarn"]["yarn_company"]["name"]
        dye_lot = yarn_JSON_data["dye_lot"]
        yarn_photo = yarn_JSON_data["photos"][0]["medium2_url"]
        print(yarn_name, yarn_price, yarn_weight, yarn_skeins, dye_lot, yarn_photo)
