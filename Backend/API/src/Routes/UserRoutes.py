from flask import Blueprint, make_response, request
from sqlalchemy import exc

#MODELOS
from Models.UserModel import Usuarios
#SCHEMAS
from Schemas.UsuariosSchema import user_schema

from Schemas.AreaSchema import areas_schema
#UTILS
from Utils.db import db

users = Blueprint('users', __name__)

@users.route('/create_user', methods=['POST'])
def create_user():
    correo    = request.json['correo']
    area      = request.json['area']
    nombre    = request.json['nombre']
    apellido1 = request.json['apellido1']
    apellido2 = request.json['apellido2']

    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_USUARIO', [correo, area, nombre, apellido1, apellido2])
        cursor.close()
        connection.commit()
        return make_response({
        "name":nombre,
        "lastname1":apellido1,
        "lastname2":apellido2,
        "email":correo,
        "area":area    
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)

@users.route('/update_user/<id>', methods=['POST'])
def modify_user(id):
    user = Usuarios.query.get(id)
    correo = request.json['correo']
    area = request.json['area']
    user.correo = correo
    user.area   = area
    try:
        db.session.commit()
        return make_response({
            "msg":"OK"
        }, 200)
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        })
        
    

@users.route('/get_user/<id>', methods=['GET'])
def login(id):
    user = Usuarios.query.get(id) 
    area_schemass = areas_schema.dump(user.area)
    return make_response({
        "id":user.id_usuario,
        "name":user.name_user.nombre,
        "lastname1":user.name_user.apellido1,
        "lastname2":user.name_user.apellido2,
        "email":user.correo,
        "area":area_schemass
    }, 200) 

@users.route('/delete_user/<id>', methods=['DELETE'])
def delete_user(id):
    connection = db.engine.raw_connection()
    try:
        
        cursor = connection.cursor()
        cursor.callproc('DELETE_USUARIO', [id])
        cursor.close()
        connection.commit()
        
        return make_response({
            "msg":"OK"}, 200)
    except exc.SQLAlchemyError:
        return make_response({
            "msg":"ERROR"}, 400)
    
    


