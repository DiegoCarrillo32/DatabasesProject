from flask import Blueprint, make_response, request
from Models.UserModel import Usuarios
from Schemas.UsuariosSchema import user_schema
from sqlalchemy import exc
from Utils.db import db
users = Blueprint('users', __name__)

@users.route('/create_user', methods=['POST'])
def create_user():
    print(request.json)
    correo = request.json['correo']
    area = request.json['area']
    id = request.json['id_usuario']
    
    new_user = Usuarios(correo, area, id)
    db.session.add(new_user)
    try:
        db.session.commit()
        return  user_schema.jsonify(new_user)
    except exc.SQLAlchemyError:
        db.session.rollback()
        return 'ERROR AL INSERTAR'

@users.route('/update_user/<id>', methods=['POST'])
def modify_user(id):
    user = Usuarios.query.get(id)
    correo = request.json['correo']
    area = request.json['area']
    user.correo = correo
    user.area   = area
    db.session.commit()
    return user_schema.jsonify(user)


@users.route('/get_user/<id>', methods=['GET'])
def login(id):
    print(id)
    user = Usuarios.query.get(id) 
    return make_response(user_schema.jsonify(user), 200) 

