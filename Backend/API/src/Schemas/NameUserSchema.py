from Utils.db import ma
class NameUserSchema(ma.Schema):
    class Meta:
        fields= ('id_usuario', 'nombre', 'apellido1', 'apellido2')
nameuser_schema = NameUserSchema()
nameusers_schema = NameUserSchema(many=True)
