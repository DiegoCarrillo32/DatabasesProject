from Utils.db import ma
class UsuarioSchema(ma.Schema):
    class Meta:
        fields= ('id_usuario', 'correo', 'area')
user_schema = UsuarioSchema()
users_schema = UsuarioSchema(many=True)
