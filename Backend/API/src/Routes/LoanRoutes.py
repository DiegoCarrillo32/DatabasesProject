from flask import Blueprint, jsonify, make_response, request
import pymysql
from sqlalchemy import exc

#Models
from Models.AssetModel import Prestamos
from Models.AreaModel import Area
#Schemas
from Schemas.LoanSchema import loan_schema, loans_schema
#Utils
from Utils.db import db

loans = Blueprint('loans', __name__)

@loans.route('/loans/<id_ins>', methods=['GET'])
def get_loans(id_ins):
    try:
        # do an inner join with sql alchemy
        res = db.session.query(Prestamos).join(Area, Area.id_institucion == id_ins).all() 
        print(res)
        # loans = Prestamos.query.all()
        return loans_schema.jsonify(res)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})
    
@loans.route('/loans/<id>', methods=['GET'])
def get_loan(id):
    try:
        loan = Prestamos.query.get(id)
        return loan_schema.jsonify(loan)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})

@loans.route('/create_loan', methods=['POST'])
def create_loan():
    asset_id = request.json['id_activo']
    user_id = request.json['id_usuario']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_PRESTAMOS', [asset_id, user_id])
        cursor.close()
        connection.commit()
        return make_response({
        "asset_id":asset_id,
        "user_id":user_id,
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)

@loans.route('/delete_loan', methods=['DELETE'])
def delete_loan():
    loan_id = request.json['id_prestamo']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('DELETE_PRESTAMOS', [loan_id])
        cursor.close()
        connection.commit()
        return make_response({
            "msg":"OK"
        }, 200)
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)
        
@loans.route('/update_loan', methods=['PUT'])
def update_loan():
    asset_id = request.json['id_prestamo']
    status = request.json['estado']
    date_start = request.json['fecha_so']
    date_end = request.json['fecha_de']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('UPDATE_PRESTAMOS', [asset_id, status, date_start, date_end])
        cursor.close()
        connection.commit()
        return make_response({
            "asset_id":asset_id,
            "date_start":date_start,
            "date_end":date_end,
            "status":status
        }, 200)
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)
