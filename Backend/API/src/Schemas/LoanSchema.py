from Utils.db import ma
from Schemas.AssetSchema import AssetSchema
class LoanSchema(ma.Schema):
    class Meta:
        fields= ('id_prestamo', 'id_activo', 'estado', 'fecha_so', 'fecha_de')
    ma.Nested(AssetSchema, many=True)
loan_schema = LoanSchema()
loans_schema = LoanSchema(many=True)
