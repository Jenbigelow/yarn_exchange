
"""Server for yarn stash exchange."""
from flask import Flask, jsonify, render_template, request, session
from model import db, Yarn, connect_to_db, User, Favorite, Seller
import crud as crud


from jinja2 import StrictUndefined

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/api/yarns")
def get_yarns():
  return jsonify({"yarns": Yarn.all_yarns()})

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
       session['user'] = create_user.user_id
       return jsonify({"status": 'true', "message": "User created", 'userID': create_user.user_id})
   else:
      return jsonify({"status": 'false', "message": "User already exists"})

@app.route("/api/likes/<yarn_id>", methods=['POST'])
def liking(yarn_id):
   yarn = crud.get_yarn_by_id(yarn_id)
   primary_key = request.json.get('user')
   user = crud.get_user_by_id(primary_key)

   if crud.find_fav_yarn(primary_key, yarn_id) != None:
      if crud.find_fav_status(primary_key, yarn_id):
         like = False
      else:
         like = True
      
      favorite_status = crud.change_fav_status(primary_key, yarn_id, like)
   else:
      like = True
      favorite_status = crud.yarn_fav(user = user, yarn = yarn, favorite = True)
   db.session.add(favorite_status)
   db.session.commit()
   return jsonify({"status": like, "user": primary_key, "yarn": yarn_id})

@app.route("/api/sessionstatus")
def show_like():
   primary_key = session.get('user')
   print(primary_key)
   return jsonify({"user": primary_key})

@app.route("/api/user/<user_id>")
def get_user(user_id):
  return jsonify({"yarns": Favorite.look_up_favorited_yarn_by_user_id(int(user_id))})

@app.route("/api/seller/<seller_id>")
def get_seller(seller_id):
  return jsonify({"yarns": Yarn.look_up_yarn_by_seller_id(int(seller_id))})

@app.route("/api/yarn_form")
def list_yarn_weights():
   print(Yarn.get_yarn_weights())
   return jsonify({"yarn_weights": Yarn.get_yarn_weights()})

@app.route("/api/yarns_search", methods=['POST'])
def search_yarns():
   yarn_weight = request.json.get("yarn_weight")
   return jsonify({"yarns": Yarn.get_yarn_by_weights(yarn_weight)})

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6060)