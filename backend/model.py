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
    
    @classmethod
    def get_user_by_email(cls, email):
        """Return user by email"""
        user = cls.query.filter(cls.email == email).first()
        return (
            {"email": user.email, "password": user.password}
        )


    
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

    @classmethod
    def all_yarns(cls):
        """Return all yarns."""

        return [
            {
                "yarn_id": yarn.yarn_id,
                "yarn_name": yarn.yarn_name,
                "yarn_photo":yarn.yarn_photo,
                "yarn_price": yarn.yarn_price,
            }
            for yarn in cls.query.all()
        ]
    @classmethod
    def get_yarn_by_id(cls, yarn_id):
        """Return yarn by id"""
        yarn = cls.query.get(yarn_id)
        return (
            {
                "yarn_id": yarn.yarn_id,
                "yarn_name": yarn.yarn_name,
                "yarn_photo":yarn.yarn_photo,
                "yarn_price": yarn.yarn_price,
                "yarn_skeins": yarn.yarn_skeins,
                "yarn_company": yarn.yarn_company,
                "yarn_weight": yarn.yarn_weight,
                "dye_lot": yarn.dye_lot,
                "seller_name":yarn.seller.seller_name,
                "seller_location": yarn.seller.seller_location,
                "seller_id": yarn.seller.seller_id
            }

        )
    @classmethod
    def get_yarn_weights(cls):
        yarns= cls.query.all()
        yarn_weights = []
        for yarn in yarns:
            if yarn.yarn_weight not in yarn_weights:
                yarn_weights.append(yarn.yarn_weight)
        return yarn_weights
    
    @classmethod
    def get_yarn_by_weights(cls, yarn_weight):
                return [
            {
                "yarn_id": yarn.yarn_id,
                "yarn_name": yarn.yarn_name,
                "yarn_photo":yarn.yarn_photo,
                "yarn_price": yarn.yarn_price,
            }
            for yarn in cls.query.filter(cls.yarn_weight==yarn_weight)]

    @classmethod
    def look_up_yarn_by_seller_id(cls, seller_id):
        """Return all yarn of seller"""
        return [
            {
                "yarn_id": seller_yarn.yarn_id,
                "yarn_name": seller_yarn.yarn_name,
                "yarn_photo": seller_yarn.yarn_photo,
                "yarn_price": seller_yarn.yarn_price,
                "seller_id": seller_yarn.seller.seller_id,
                "seller_name":seller_yarn.seller.seller_name,
                "seller_location": seller_yarn.seller.seller_location
            }
            for seller_yarn in cls.query.filter(cls.seller_id == seller_id).all()
        ]
    def __repr__(self):
        return f"<Yarn yarn_id={self.yarn_id} name={self.yarn_name}>"
    
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

    @classmethod
    def look_up_favorited_yarn_by_user_id(cls, user_id):
        """Return yarn by id"""
        
        return [
            {
                "yarn_id": favorited_yarn_by_user.yarn.yarn_id,
                "yarn_name": favorited_yarn_by_user.yarn.yarn_name,
                "yarn_photo":favorited_yarn_by_user.yarn.yarn_photo,
                "yarn_price": favorited_yarn_by_user.yarn.yarn_price,
                "seller_name":favorited_yarn_by_user.yarn.seller.seller_name,
                "seller_location": favorited_yarn_by_user.yarn.seller.seller_location
            }
            for favorited_yarn_by_user in cls.query.filter(cls.user_id == user_id, cls.favorite == True).all()
        ]
    

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
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
