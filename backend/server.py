
"""Server for yarn stash exchange."""
from flask import Flask, jsonify, render_template, request
from model import db, Yarn, connect_to_db
import crud as crud


from jinja2 import StrictUndefined

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/api/yarns")
def get_yarns():
  return {"yarns": Yarn.all_yarns()}

@app.route("/api/yarns/{yarn_id}")
def get_yarn_by_id():
  yarn_id = request.args.get(yarn_id)
  yarn = crud.get_yarn_by_id(yarn_id)
  return (yarn)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6060)