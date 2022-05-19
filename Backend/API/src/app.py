
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from Routes.UserRoutes import users

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pymssql://sa:789512365Ca@localhost/INVENTARIO_IACSA'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
Marshmallow(app)
SQLAlchemy(app)

app.register_blueprint(users) 

if __name__ == '__main__':
    app.run(debug=True, port=5000)

