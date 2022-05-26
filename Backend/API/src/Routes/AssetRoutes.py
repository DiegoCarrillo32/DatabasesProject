from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from Models.AssetModel import Activos

from Schemas.AssetSchema import assets_schema, asset_schema
from Schemas.TypeSchema import type_schema, types_schema
from Schemas.UbicationSchema import ubication_schema, ubications_schema
from Schemas.AreaSchema import area_schema, areas_schema
from Utils.db import db

assets = Blueprint('assets', __name__)

@assets.route('/assets', methods=['GET'])
def get_assets():
    assets = Activos.query.all()
    list_of_assets = []
    for asset in assets:
        
        type = type_schema.dump(asset.type[0])
        ubi = ubication_schema.dump(asset.ubicacion)
        area = area_schema.dump(asset.area)
        asset_info = {
            "id_activo": asset.id_activo,
            "nombre_activo": asset.nombre_activo,
            "id_ubicacion":asset.id_ubicacion,
            "tipo": type,
            "ubicacion": ubi,
            "area": area
            
        }
        list_of_assets.append(asset_info)
    return make_response(jsonify(list_of_assets), 200)
    

@assets.route('/assets/<id>', methods=['GET'])
def get_asset(id):
    asset = Activos.query.get(id)
    return asset_schema.jsonify(asset)

@assets.route('/create_asset', methods=['POST'])
def create_asset():
    print(request.json)
    id_area = request.json['id_area']
    nombre_activo = request.json['nombre_activo']
    placa = request.json['placa']
    descripcion = request.json['descripcion']
    garantia = request.json['garantia']
    id_ubicacion = request.json['id_ubicacion']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_ACTIVO', [id_area, nombre_activo ,placa, descripcion, garantia, id_ubicacion])
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
    id_area = request.json['id_area']
    placa = request.json['placa']
    descripcion = request.json['descripcion']
    garantia = request.json['garantia']
    id_ubicacion = request.json['id_ubicacion']
    nombre_activo = request.json['nombre_activo']
    connection = db.engine.raw_connection()
    
    try:
        cursor = connection.cursor()
        cursor.callproc('UPDATE_ACTIVO', [id, condicion, id_area, placa, descripcion, garantia, id_ubicacion, nombre_activo])
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

