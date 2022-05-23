from flask import Blueprint, request, make_response
from sqlalchemy import exc
from Utils.db import db

from Models.AreaModel import Area
#Schemas
from Schemas.AreaSchema import area_schema, areas_schema
areas = Blueprint('areas', __name__)

@areas.route('/areas', methods=['GET'])
def get_areas():
    try:
        areas = Area.query.all()
        return areas_schema.jsonify(areas)
    except exc.SQLAlchemyError as e:    
        return {'error': str(e)}, 500
    
@areas.route("/create_area", methods=['POST'])
def create_area():
    nombre = request.json['nombre']
    logo = request.json['logo']
    encargado = request.json['encargado']
    id_institucion = request.json['id_institucion']
    area = Area(nombre, logo, encargado, id_institucion)
    try:
        db.session.add(area)
        db.session.commit()
        return make_response({
            "msg":"OK"
        }, 200)
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)
