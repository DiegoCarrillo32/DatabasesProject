from flask import Blueprint, make_response, request
from sqlalchemy import exc

from Utils.db import db

assets = Blueprint('assets', __name__)

@assets.route('/asset', methods=['GET'])
def live():
    return 'ASSETS IS WORKING'

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
        })
        
    except exc.SQLAlchemyError:
        db.session.rollback()
        return 'ERROR AL INSERTAR'

