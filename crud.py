"""CRUD operations."""

from model import db, User, Yarn, Favorite, Seller, connect_to_db

def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    return user

def all_users():
    """Returns all the users"""

    list_of_users=User.query.all()

    return list_of_users

def get_user_by_id(user_id):
    """Get user by ID"""
    selected_user = User.query.get(user_id)
    return selected_user

def create_yarn(yarn_name, yarn_price, yarn_photo, yarn_skeins, yarn_company, yarn_weight, dye_lot, seller):
    """Create and return a yarn."""

    yarn = Yarn(yarn_name=yarn_name, yarn_price=yarn_price, yarn_photo=yarn_photo, yarn_skeins=yarn_skeins, yarn_company=yarn_company, yarn_weight=yarn_weight, dye_lot=dye_lot, seller=seller)
    return yarn 

def all_yarns():
    """Returns all the yarns"""

    list_of_yarns=Yarn.query.all()

    return list_of_yarns

def get_yarn_by_id(yarn_id):
    """Get yarn by ID"""
    selected_yarn = Yarn.query.get(yarn_id)
    return selected_yarn


def yarn_fav(user, yarn, favorite): 
    """Create a favorite yarn"""
    favorited_yarn = Favorite(user=user, yarn=yarn, favorite=favorite)

    return favorited_yarn 

def look_up_favorited_yarn_by_user_id(user_id):
    """Look up a favorited yarn by user_id"""

    favorited_yarns_by_user=Favorite.query.filter(Favorite.user_id == user_id).all()
    return favorited_yarns_by_user

def look_up_favorited_yarn_by_yarn_id(yarn_id):
    """Look up a favorited yarn by yarn_id"""

    rated_yarns=Favorite.query.filter(Favorite.yarn_id == yarn_id).all()
    return rated_yarns

def get_user_by_email(email):
    """Get a user by email"""

    return User.query.filter(User.email == email).first()

def create_seller(seller_name, seller_location):
    """Create a seller"""
    seller = Seller(seller_name=seller_name,seller_location=seller_location)

    return seller

def all_sellers():
    """Returns all the sellers"""

    list_of_sellers=Seller.query.all()

    return list_of_sellers

def get_seller_by_id(seller_id):
    """Get seller by ID"""
    selected_seller = Seller.query.get(seller_id)
    return selected_seller

def look_up_yarn_by_seller_id(seller_id):
    yarns_from_seller = Yarn.query.filter(Yarn.seller_id == seller_id).all()
    return yarns_from_seller

if __name__ == '__main__':
    from server import app
    connect_to_db(app)