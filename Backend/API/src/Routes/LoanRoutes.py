from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc

#Models
from Models.AssetModel import Prestamos
#Schemas
from Schemas.LoanSchema import loan_schema, loans_schema
#Utils
from Utils.db import db

loans = Blueprint('loans', __name__)

@loans.route('/loans', methods=['GET'])
def get_loans():
    try:
        loans = Prestamos.query.all()
        return loans_schema.jsonify(loans)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})
    
@loans.route('/loans/<asset_id>', methods=['GET'])
def get_loan(id):
    try:
        loan = Prestamos.query.get(id)
        return loan_schema.jsonify(loan)
    except exc.SQLAlchemyError as e:
        return jsonify({"error": str(e)})

@loans.route('/loans/<asset_id>', methods=['DELETE'])
def delete_assets(asset_id):
    try:
        loan = Prestamos.query.get(asset_id)
        db.session.delete(loan)
        db.session.commit()
        return make_response({"msg": "OK"}, 200)
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)})

@loans.route('/create_loan', methods=['POST'])
def create_loan():
    asset_id = request.json['id_prestamo']
    user_id = request.json['id_usuario']
    status = request.json['estado']
    total_date = request.json['tiempo_pr']
    date_start = request.json['fecha_so']
    date_end = request.json['fecha_de']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('INSERT_PRESTAMO', [asset_id, user_id, status, total_date, date_start, date_end])
        cursor.close()
        connection.commit()
        return make_response({
        "asset_id":asset_id,
        "user_id":user_id,
        "date_start":date_start,
        "date_end":date_end,
        "status":status
    }, 200) 
    except exc.SQLAlchemyError:
        db.session.rollback()
        return make_response({
            "msg":"error"
        }, 400)

@loans.route('/delete_loan', methods=['DELETE'])
def delete_loan():
    asset_id = request.json['id_prestamo']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('DELETE_PRESTAMO', [asset_id])
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
    total_date = request.json['tiempo_pr']
    date_start = request.json['fecha_so']
    date_end = request.json['fecha_de']
    connection = db.engine.raw_connection()
    try:
        cursor = connection.cursor()
        cursor.callproc('UPDATE_PRESTAMO', [asset_id, status, total_date, date_start, date_end])
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
