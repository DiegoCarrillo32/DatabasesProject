
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sa:789512365Ca@localhost/INVENTARIO_IACSA'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
ma = Marshmallow(app)
db = SQLAlchemy(app)

class Usuario(db.Model):
    id_usuario = db.Column(db.SmallInteger, primary_key=True)
    correo = db.Column(db.String(70))
    area = db.Column(db.String(30))
    def __init__(self, correo, area):
        self.correo = correo
        self.area = area
db.create_all()       

class UsuarioSchema(ma.Schema):
    class Meta:
        fields= ('id_usuario', 'correo', 'area')
user_schema = UsuarioSchema()
users_schema = UsuarioSchema(many=True)

@app.route('/user', methods=['POST'])
def create_user():
    print(request.json)
    return 'recieved'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
