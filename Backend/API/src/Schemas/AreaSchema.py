from Utils.db import ma
class AreaSchema(ma.Schema):
    class Meta:
        fields= ('id_area','nombre', 'logo', 'encargado', 'id_institucion')
area_schema = AreaSchema()
areas_schema = AreaSchema(many=True)
