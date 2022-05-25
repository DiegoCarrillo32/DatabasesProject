
from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from Models.AreaModel import Area

#MODELOS
from Models.UserModel import Usuarios
#SCHEMAS
from Schemas.UsuariosSchema import user_schema, users_schema

from Schemas.AreaSchema import areas_schema, area_schema
#UTILS
from Utils.db import db

users = Blueprint('users', __name__)

@users.route('/create_user', methods=['POST'])
def create_user():
    correo    = request.json['correo']
    nombre    = request.json['nombre']
    apellido1 = request.json['apellido1']
    apellido2 = request.json['apellido2']

    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_USUARIO', [correo, nombre, apellido1, apellido2])
        cursor.close()
        connection.commit()
        return make_response({
        "name":nombre,
        "lastname1":apellido1,
        "lastname2":apellido2,
        "email":correo,
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
    
    connection = db.engine.raw_connection()
    try:
        
        cursor = connection.cursor()
        cursor.callproc('UPDATE_USUARIO', [id, correo, name, lastname1, lastname2])
        cursor.close()
        connection.commit()
        
        return make_response({
            "msg":"OK"}, 200)
    except exc.SQLAlchemyError:
        return make_response({
            "msg":"ERROR"}, 400)
    
@users.route('/get_user/<id>', methods=['GET'])
def login(id):
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
    
@users.route("/get_users", methods=['GET'])
def get_users():
    try:
        users = Usuarios.query.all()
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
    
    


