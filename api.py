"""Getting API data from Ravelry for yarn stash exchange."""
from flask import Flask, render_template, request, jsonify

from pprint import pformat, pprint
import requests
import os
import json

app = Flask(__name__)

R_USERNAME = os.environ['R_USERNAME']
R_PASSWORD = os.environ['R_PASSWORD']

auth_params = (R_USERNAME, R_PASSWORD)
payload = {
    "stash-status":"trade"
}
url ="https://api.ravelry.com/stash/search.json?query"

res = requests.get(url, params = payload, auth = auth_params)

# print(res.json())

stashes = res.json()["stashes"]
# print(stashes)

yarn_ID = stashes[1]["id"]
# print(yarn_ID)

total_yarn_data = {}
for yarn in stashes:
    yarn_ID = yarn["id"]
    rav_username = yarn["user"]["username"]
    user_url = f"https://api.ravelry.com//people/{rav_username}/stash/{yarn_ID}.json"
    yarn_data = requests.get(user_url, auth = auth_params)
    notes_html = yarn_data.json()["stash"]["notes_html"]
    # print(notes_html)
    if "$" in notes_html:
        print(notes_html)