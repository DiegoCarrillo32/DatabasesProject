from flask import Blueprint, request
from sqlalchemy import exc
from Models.AreaModel import Area
from Utils.db import db

areas = Blueprint('areas', __name__)

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
        return "AREA AGREGADA"
    except exc.SQLAlchemyError:
        db.session.rollback()
        return "ERROR AL INSERTAR"
