from Utils.db import ma
class AreaSchema(ma.Schema):
    class Meta:
        fields= ('nombre', 'logo', 'encargado', 'id_institucion')
area_schema = AreaSchema()
areas_schema = AreaSchema(many=True)
