from flask import Blueprint, jsonify, request, make_response
from sqlalchemy import exc
from Utils.db import db

from Models.AreaModel import Area
#Schemas
from Schemas.AreaSchema import area_schema, areas_schema
from Schemas.UsuariosSchema import user_schema, users_schema
from Schemas.NameUserSchema import nameuser_schema
areas = Blueprint('areas', __name__)

@areas.route('/areas', methods=['GET'])
def get_areas():
    try:
        areas_list = []
        areas = Area.query.all()
        for i in areas:
            user = nameuser_schema.dump(i.user.name_user)
            print(user)
            area_info = {
                "id_area":i.id_area,
                "nombre":i.nombre,
                "logo":i.logo,
                "encargado":user,
                "id_institucion":i.id_institucion
            }
            areas_list.append(area_info)
        return make_response(jsonify(areas_list), 200)
    except exc.SQLAlchemyError as e:    
        return {'error': str(e)}, 500
    
@areas.route("/create_area", methods=['POST'])
def create_area():
    nombre = request.json['nombre']
    logo = request.json['logo']
    encargado = request.json['encargado']
    id_institucion = request.json['id_institucion']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_AREA', [nombre, logo, encargado, id_institucion])
        cursor.close()
        connection.commit()
        return make_response({
          "msg":"OK"  
        }, 200)
        
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"ERROR"
        }, 400)
    
