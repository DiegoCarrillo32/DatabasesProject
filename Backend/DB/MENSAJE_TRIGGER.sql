CREATE OR ALTER TRIGGER [dbo].[MENSAJE_TRIGGER]
ON  AREA
AFTER INSERT , UPDATE
AS
BEGIN
    DECLARE @ID_USUARIO SMALLINT
    SELECT @ID_USUARIO = ENCARGADO FROM INSERTED
    insert into MENSAJES(ID_MENSAJE,ASUNTO, CONTENIDO)
    VALUES (
        @ID_USUARIO,
        'NUEVA AREA ASIGNADA',
        'Se ha asignado una nueva area, ahora usted tiene acceso a los activos del area'
    )
END