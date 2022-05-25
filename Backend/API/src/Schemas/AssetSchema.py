from Utils.db import ma
class AssetSchema(ma.Schema):
    class Meta:
        fields= ('id_ubicacion', 'area_nombre', 'nombre_activo')
asset_schema = AssetSchema()
assets_schema = AssetSchema(many=True)
