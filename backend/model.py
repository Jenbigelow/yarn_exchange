"""Models for yarn stash exchange."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    favorites = db.relationship("Favorite", back_populates="user")

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"
    
class Yarn(db.Model):
    """A yarn."""

    __tablename__ = "yarns"

    yarn_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    yarn_name = db.Column(db.String)
    yarn_price = db.Column(db.Integer)
    yarn_photo = db.Column(db.String)
    yarn_skeins = db.Column(db.Float)
    yarn_company = db.Column(db.String)
    yarn_weight = db.Column(db.String)
    dye_lot = db.Column(db.String)
    seller_id = db.Column(db.Integer, db.ForeignKey("sellers.seller_id"))

    favorites = db.relationship("Favorite", back_populates="yarn")
    seller = db.relationship("Seller", back_populates="yarn")

    

    def __repr__(self):
        return f"<Yarn yarn_id={self.yarn_id} title={self.yarn_name}>"
    
    def to_dict(self):
        return {'yarn_id': self.yarn_id,
                'yarn_price': self.yarn_price,
                'yarn_photo':self.yarn_photo}

class Favorite(db.Model):
    """A favorited yarn."""

    __tablename__ = "favorites"

    favorite_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    favorite = db.Column(db.Boolean)
    user_id = db.Column(db.Integer,db.ForeignKey("users.user_id"))
    yarn_id = db.Column(db.Integer, db.ForeignKey("yarns.yarn_id"))
    
    yarn = db.relationship("Yarn", back_populates="favorites")
    user = db.relationship("User", back_populates="favorites")
    

    def __repr__(self):
        return f"<Favorites favorite_id={self.favorite_id} favorite={self.favorite}>"
    


class Seller(db.Model):
    """A seller."""

    __tablename__ = "sellers"

    seller_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    seller_name = db.Column(db.String, unique=True)
    seller_location = db.Column(db.String)

    yarn = db.relationship("Yarn", back_populates="seller")

    def __repr__(self):
        return f"<Seller seller_id={self.seller_id} seller_location={self.seller_location}>"

def connect_to_db(flask_app, db_uri="postgresql:///yarn_exchange", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo = False 
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from project.backend.server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
