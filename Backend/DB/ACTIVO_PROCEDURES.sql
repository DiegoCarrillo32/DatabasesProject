-- @CONDICION VARCHAR(30),
USE INVENTARIO_IACSA
GO
CREATE PROCEDURE INSERT_ACTIVO(@ID_AREA SMALLINT,@NOMBRE_ACTIVO VARCHAR(20),@PLACA INT, @DESCRIPCION VARCHAR(150), @GARANTIA VARCHAR(20), @ID_UBICACION SMALLINT)
AS
    INSERT INTO ACTIVOS(ID_AREA, NOMBRE_ACTIVO,ID_UBICACION) VALUES (
        @ID_AREA,
        @NOMBRE_ACTIVO,
        @ID_UBICACION
    )

    INSERT INTO TIPOS(PLACA, DESCRIPCION, GARANTIA) VALUES (
        @PLACA,
        @DESCRIPCION,
        @GARANTIA
    )
    -- INSERT INTO CONTROL_ACTIVOS(CONDICION,FECHA_CONTROL) VALUES(
    --     @CONDICION,
    --     GETDATE()
    -- )

GO



CREATE PROC DELETE_ACTIVO(@ID_ACTIVO SMALLINT)
AS  
    DELETE FROM ACTIVO
    WHERE @ID_ACTIVO = ID_ACTIVO

    DELETE FROM TIPOS
    WHERE @ID_ACTIVO = ID_ACTIVO

    DELETE FROM ID_UBICACION
    WHERE @ID_ACTIVO = ID_ACTIVO
GO

CREATE PROC UPDATE_ACTIVOS(@ID_ACTIVO SMALLINT,@CONDICION VARCHAR(30),@ID_AREA SMALLINT,@PLACA INT, @DESCRIPCION VARCHAR(150), @GARANTIA VARCHAR(20),@ID_UBICACION SMALLINT, @NOMBRE_ACTIVO VARCHAR(20))
AS
    UPDATE ACTIVO
    SET
        [ID_AREA] = @ID_AREA,
        [NOMBRE_ACTIVO] = @NOMBRE_ACTIVO,
        [ID_UBICACION] = @ID_UBICACION
    WHERE @ID_ACTIVO = ID_ACTIVO;

    UPDATE TIPOS
    SET
    [PLACA] = @PLACA,
    [DESCRIPCION] = @DESCRIPCION,
    [GARANTIA] = @GARANTIA
    WHERE @ID_ACTIVO = ID_ACTIVO;

    UPDATE CONTROL_ACTIVO
    SET
    [ESTADO_ACTIVO] = @CONDICION,
    [FECHA_CONTROL] = GETDATE()
    WHERE @ID_ACTIVO = ID_ACTIVO;
GO

