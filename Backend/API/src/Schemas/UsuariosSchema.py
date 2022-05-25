
from Schemas.NameUserSchema import NameUserSchema
from Schemas.AreaSchema import AreaSchema
from Utils.db import ma
class UsuarioSchema(ma.Schema):
    class Meta:
        # field area is a list of dicts  
        fields= ('id_usuario', 'correo', 'contrasena')
    ma.Nested(AreaSchema, many=True)
    ma.Nested(NameUserSchema, many=True)
user_schema = UsuarioSchema()
users_schema = UsuarioSchema(many=True)
