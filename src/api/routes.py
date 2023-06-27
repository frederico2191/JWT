"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST','GET'])
def handle_sign_up():
    user_email = request.json.get('email',None)
    password = request.json.get('password',None)

    response_user_found = {
        "message": "E-mail address already taken"
    }
    response_body = {
        "message": "Sucessfuly registered user"
    }

    existing_user = User.query.filter_by(email=user_email).first()
    if existing_user:
        return jsonify(response_user_found), 400

    user = User()
    user.email = user_email
    user.password = password
    user_data = user.serialize()
    print(user_data,"user data to register")

    db.session.add(user)
    db.session.commit()

    return jsonify(user_data,response_body), 200

    


@api.route('/login', methods=['POST'])
def handle_login():
    requestedEmail = request.json.get('email',None)
    requestedPassword = request.json.get('password',None)
    print (requestedEmail,"1x1")
    print (requestedPassword,"2x2")

    user = User.query.filter_by(email=requestedEmail, password=requestedPassword).first()

    if user is None:
        return jsonify({"msg": "Bad username or password Carlos class"}), 401
    
    access_token = create_access_token(identity=user.id)
    print("TOKEN- INSIDE handle login", access_token)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/token', methods=['POST'])
def create_token():
    # body = {'email:','password'}
    email = request.json.get('email',None)
    password = request.json.get('password',None)
    if email != "test" or password != "test":
        return jsonify({"message":"Bad username or password mine!!!"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    # return jsonify(response_body),200s


@api.route('/private', methods=['POST', 'GET'])
def handle_private():

    response_body = {
        "message": "Private! I'm a message that came from the backend,"
    }

    return jsonify(response_body), 200