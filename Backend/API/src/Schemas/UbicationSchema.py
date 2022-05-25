from Utils.db import ma
class UbicationSchema(ma.Schema):
    class Meta:
        fields= ('id_ubicacion', 'detalle', 'nombre')
ubication_schema = UbicationSchema()
ubications_schema = UbicationSchema(many=True)
