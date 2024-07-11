
"""Server for yarn stash exchange."""
from flask import Flask, jsonify, render_template
from model import db, Yarn, connect_to_db
import crud as crud

from jinja2 import StrictUndefined

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined



# @app.route('/')
# def home():

#     return render_template('index.html')

@app.route('/api/yarns')
def get_yarns():
    return {"yarns": crud.all_yarns()}


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6060)