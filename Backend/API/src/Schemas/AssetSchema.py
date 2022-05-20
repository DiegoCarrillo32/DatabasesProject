from Utils.db import ma
class AreaSchema(ma.Schema):
    class Meta:
        fields= ('id_ubicacion', 'condicion', 'area_nombre')
asset_schema = AreaSchema()
assets_schema = AreaSchema(many=True)
