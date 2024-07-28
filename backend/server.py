
"""Server for yarn stash exchange."""
from flask import Flask, jsonify, render_template, request, session
from model import db, Yarn, connect_to_db, User, Favorite
import crud as crud


from jinja2 import StrictUndefined

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/api/yarns")
def get_yarns():
  return {"yarns": Yarn.all_yarns()}

@app.route("/api/yarns/<yarn_id>")
def get_yarn(yarn_id):
  return jsonify(Yarn.get_yarn_by_id(int(yarn_id)))

@app.route("/api/login", methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    account_user = crud.get_user_by_email(email)
    if account_user == None:
       return jsonify({"status": 'false', "message": "User not found"})
    if password == account_user.password and account_user.email == email:
       session['user'] = account_user.user_id
       return jsonify({'status': 'true', 'message': 'Logged in', 'userID': account_user.user_id})
    else:
       return jsonify({"status": 'false', "message": "Password does not match"})

@app.route("/api/createaccount", methods=['POST'])
def createaccount():
   email = request.json.get("email")
   password = request.json.get("password")

   account_user = crud.get_user_by_email(email)
   if account_user == None:
       create_user = crud.create_user(email, password)
       db.session.add(create_user)
       db.session.commit()
       session['user'] = account_user.user_id
       return jsonify({"status": 'true', "message": "User created", 'userID': create_user.user_id})
   else:
      return jsonify({"status": 'false', "message": "User already exists"})

@app.route("/api/likes/<yarn_id>", methods=['POST'])
def liking(yarn_id):
   yarn = crud.get_yarn_by_id(yarn_id)
   like = request.json.get("like")
   primary_key = session.get('user')
   user = crud.get_user_by_id(primary_key)
   if user == None:
      return(({"status": like, "user": primary_key, "yarn": yarn_id}))

   favorite_status = crud.yarn_fav(user = user, yarn = yarn, favorite = like)
   db.session.add(favorite_status)
   db.session.commit()
   return jsonify({"status": like, "user": primary_key, "yarn": yarn_id})

@app.route("/api/user/<user_id>")
def get_user(user_id):
  return {"yarns": Favorite.look_up_favorited_yarn_by_user_id(int(user_id))}


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6060)