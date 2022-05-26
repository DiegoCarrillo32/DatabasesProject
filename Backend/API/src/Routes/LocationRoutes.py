from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc

#Models
from Models.UbicationModel import Ubicacion
#Schemas
from Schemas.UbicationSchema import ubication_schema, ubications_schema
#Utils
from Utils.db import db

locations = Blueprint('locations', __name__)

@locations.route('/locations', methods=['GET'])
def get_locations():
    try:
        locations = Ubicacion.query.all()
        return ubications_schema.jsonify(locations)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})

@locations.route('/locations/<id>', methods=['GET'])
def get_location(id):
    try:
        location = Ubicacion.query.get(id)
        return ubication_schema.jsonify(location)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})
    
@locations.route('/create_location', methods=['POST'])
def create_location():
    detalle = request.json['detalle']
    nombre = request.json['nombre']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_UBICACIONES', [detalle, nombre])
        cursor.close()
        connection.commit()
        return make_response({
        "detalle":detalle,
        "nombre":nombre
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)

@locations.route('/delete_location/<id>', methods=['DELETE'])
def delete_location(id):
    
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('DELETE_UBICACIONES', [id])
        cursor.close()
        connection.commit()
        return make_response({
        "location_id":id
    }, 200) 
    except exc.SQLAlchemyError:
        
        db.session.rollback()
        
        return make_response({
            "msg":"error",
            
        }, 400)
    
        
@locations.route('/update_location', methods=['POST'])
def update_location():
    location_id = request.json['id_ubicacion']
    detalle = request.json['detalle']
    nombre = request.json['nombre']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('UPDATE_UBICACIONES', [location_id, detalle, nombre])
        cursor.close()
        connection.commit()
        return make_response({
        "location_id":location_id,
        "detalle":detalle,
        "nombre":nombre
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)
