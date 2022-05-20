# from Models.UserModel import Usuarios
# from Utils.db import db
# class Nombreusuario(db.Model):
#     __tablename__ = 'NOMBRE_USUARIO'
#     id_usuario = db.Column(db.SmallInteger, 
#                            db.ForeignKey(Usuarios.id_usuario),
#                            nullable=False,
#                            primary_key=True, 
#                            autoincrement=False)
#     nombre     = db.Column(db.String(50))
#     apellido1  = db.Column(db.String(50))
#     apellido2  = db.Column(db.String(50))
#     #many to one realtionship
    
#     user = db.relationship("Usuarios", back_populates="name_user")
#     def __init__(self,nombre, apellido1, apellido2):
#         self.nombre = nombre
#         self.apellido1 = apellido1
#         self.apellido2 = apellido2
#         # self.id_usuario = id_usuario
