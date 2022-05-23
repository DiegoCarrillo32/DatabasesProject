from flask import Blueprint, make_response, request
from sqlalchemy import exc
from Models.AssetModel import Activos

from Schemas.AssetSchema import assets_schema, asset_schema

from Utils.db import db

assets = Blueprint('assets', __name__)

@assets.route('/assets', methods=['GET'])
def get_assets():
    assets = Activos.query.all()
    return assets_schema.jsonify(assets)

@assets.route('/assets/<id>', methods=['GET'])
def get_asset(id):
    asset = Activos.query.get(id)
    return asset_schema.jsonify(asset)

@assets.route('/create_asset', methods=['POST'])
def create_asset():
    print(request.json)
    area_nombre = request.json['area_nombre']
    placa = request.json['placa']
    descripcion = request.json['descripcion']
    garantia = request.json['garantia']
    id_ubicacion = request.json['id_ubicacion']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_ACTIVO', [area_nombre, placa, descripcion, garantia, id_ubicacion])
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

@assets.route('/update_asset/<id>', methods=['POST'])
def update_asset(id):
    condicion = request.json['condicion']
    area_nombre = request.json['area_nombre']
    placa = request.json['placa']
    descripcion = request.json['descripcion']
    garantia = request.json['garantia']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('UPDATE_ACTIVO', [id, condicion, area_nombre, placa, descripcion, garantia])
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

