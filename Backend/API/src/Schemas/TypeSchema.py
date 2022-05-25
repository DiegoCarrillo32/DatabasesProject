from Utils.db import ma
class TypeSchema(ma.Schema):
    class Meta:
        fields= ('id_activo', 'placa', 'descripcion', 'garantia')
type_schema = TypeSchema()
types_schema = TypeSchema(many=True)
