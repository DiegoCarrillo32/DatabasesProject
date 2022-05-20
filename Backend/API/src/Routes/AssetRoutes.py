from flask import Blueprint, make_response, request
from sqlalchemy import exc
from Models.AssetModel import Activos

from Schemas.AssetSchema import assets_schema

from Utils.db import db

assets = Blueprint('assets', __name__)

@assets.route('/assets', methods=['GET'])
def get_assets():
    assets = Activos.query.all()
    print(assets[0].ubicacion.nombre)
    print(assets[0].area.nombre)
    print(assets[0].type[0].descripcion)
    return assets_schema.jsonify(assets)

@assets.route('/create_asset', methods=['POST'])
def create_asset():
    print(request.json)
    condicion = request.json['condicion']
    area_nombre = request.json['area_nombre']
    placa = request.json['placa']
    descripcion = request.json['descripcion']
    garantia = request.json['garantia']
    id_ubicacion = request.json['id_ubicacion']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_ACTIVO', [condicion, area_nombre, placa, descripcion, garantia, id_ubicacion])
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
        
@assets.route('/delete_asset/<id>', methods=['POST'])
def delete_asset(id):
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('DELETE_ACTIVO', [id])
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
    

