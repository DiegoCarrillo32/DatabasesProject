
from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
import uuid
#MODELOS
from Models.AreaModel import Area
from Models.UserModel import Usuarios
#SCHEMAS
from Schemas.UsuariosSchema import user_schema, users_schema

from Schemas.AreaSchema import areas_schema, area_schema
#UTILS
from Utils.db import db

users = Blueprint('users', __name__)
@users.route('/create_userinstitution', methods=['POST'])
def create_userinst():
    id_usuario = str(uuid.uuid1())
    correo    = request.json['correo']
    nombre    = request.json['nombre']
    apellido1 = request.json['apellido1']
    apellido2 = request.json['apellido2']
    contrasena = request.json['contrasena']
    nombre_institucion = request.json['nombre_institucion']
    correo_institucion = request.json['correo_institucion']
    id_institution = str(uuid.uuid1())
    
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_USUARIOINSTITUCION', [id_usuario, id_institution, correo, nombre, apellido1, apellido2, contrasena, nombre_institucion, correo_institucion])
        cursor.close()
        connection.commit()
        return make_response({
            'message': 'Usuario y institucion creado con exito'
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)
        
        
@users.route('/create_user', methods=['POST'])
def create_user():
    id_usuario = str(uuid.uuid1())
    correo    = request.json['correo']
    nombre    = request.json['nombre']
    apellido1 = request.json['apellido1']
    apellido2 = request.json['apellido2']
    contrasena = request.json['contrasena']
    id_institucion = request.json['id_institucion']

    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_USUARIO', [id_usuario, id_institucion, correo, nombre, apellido1, apellido2, contrasena])
        cursor.close()
        connection.commit()
        return make_response({
        "name":nombre,
        "lastname1":apellido1,
        "lastname2":apellido2,
        "email":correo,
        "password":contrasena,
        "message":"Usuario creado con exito"
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)

@users.route('/update_user/<id>', methods=['POST'])
def modify_user(id):
    
    correo = request.json['correo']
    lastname1 = request.json['apellido1']
    lastname2 = request.json['apellido2']
    name = request.json['nombre']
    contrasena = request.json['contrasena']
    
    connection = db.engine.raw_connection()
    try:
        
        cursor = connection.cursor()
        cursor.callproc('UPDATE_USUARIO', [id, correo, name, lastname1, lastname2, contrasena])
        cursor.close()
        connection.commit()
        
        return make_response({
            "msg":"OK"}, 200)
    except exc.SQLAlchemyError:
        return make_response({
            "msg":"ERROR"}, 400)
    
@users.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    user = Usuarios.query.get(id) 
    result = Area.query.filter_by(encargado=id).all()
    area_schemass = areas_schema.dump(result)
    
    return make_response({
        "id":user.id_usuario,
        "name":user.name_user.nombre,
        "lastname1":user.name_user.apellido1,
        "lastname2":user.name_user.apellido2,
        "email":user.correo,
        "areas":area_schemass
    }, 200) 
    
@users.route("/get_users/<id>", methods=['GET'])
def get_users(id):
    try:
        
        users = Usuarios.query.filter_by(id_institucion=id).all()
        user_list = []
    
        for i in users:
            result = Area.query.filter_by(encargado=i.id_usuario).all()
            area_schemass = areas_schema.dump(result)
            user_info = {
                "name":i.name_user.nombre,
                "lastname1":i.name_user.apellido1,
                "lastname2":i.name_user.apellido2,
                "correo":i.correo,
                "id_usuario":i.id_usuario,
                "areas":area_schemass
            }
            user_list.append(user_info)
            
        
        return make_response(jsonify(user_list), 200)
    except exc.PendingRollbackError:
        return make_response(
            {
                "msg":"error"
            }, 400
        )
            
        pass
    
       

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
    
    
@users.route('/login', methods=['POST'])
def login():
    correo = request.json['correo']
    contrasena = request.json['contrasena']
    print(correo)
    print(contrasena)
    user = Usuarios.query.filter_by(correo=correo).first()
    print(user_schema.dump(user))
    print(user)
    if user and (user.contrasena.strip() == contrasena.strip()):
        return make_response({
            "id":user.id_usuario,
            "name":user.name_user.nombre,
            "lastname1":user.name_user.apellido1,
            "lastname2":user.name_user.apellido2,
            "id_institucion":user.id_institucion,
            "email":user.correo,
            "password":user.contrasena
        }, 200)
    else:
        return make_response({
            "msg":"error"
        }, 400)

