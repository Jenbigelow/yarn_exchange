
"""Server for yarn stash exchange."""
from flask import Flask, jsonify, render_template
from project.backend.model import db, Yarn
import project.backend.crud as crud

app = Flask(__name__)


# @app.route('/')
# def home():

#     return render_template('index.html')

@app.route('/api/yarns')
def get_yarns():
    yarns= crud.all_yarns()
    return jsonify({yarns.yarn_id: yarn.to_dict() for yarn in yarns})

if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True, port=6060)