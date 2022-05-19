USE INVENTARIO_IACSA
GO
CREATE PROC INSERT_PRESTAMOS(@id_activo SMALLINT,@solicitante SMALLINT,@estado VARCHAR(50),@tiempo_pr DATE,@fecha_so DATE,@fecha_de DATE)
AS
    INSERT INTO prestamos(id_activo,estado,tiempo_pr,fecha_so,fecha_de)VALUES(
        @id_activo,@estado,@tiempo_pr,@fecha_so,@fecha_de)
    --El solicitante va a ser el id del usuario
    INSERT INTO solicitante(id_usuario) VALUES(@solicitante)
GO

CREATE PROC DELETE_PRESTAMOS(@ID_PRESTAMO SMALLINT)
AS
    -- Delete rows from table 'TableName'
    DELETE FROM SOLICITANTE
    WHERE 	ID_PRESTAMO = @ID_PRESTAMO

    -- Delete rows from table 'TableName'
    DELETE FROM [dbo].[PRESTAMOS]
    WHERE 	ID_PRESTAMO = @ID_PRESTAMO
 
GO

CREATE PROCEDURE UPDATE_PRESTAMOS(@id_prestamo SMALLINT,@estado VARCHAR(50),@tiempo_pr DATE,@fecha_so DATE,@fecha_de DATE)
AS
    UPDATE PRESTAMOS
    SET 
        [ESTADO] = @ESTADO,
        [TIEMPO_PR] = @TIEMPO_PR,
        [FECHA_SO] = @FECHA_SO,
        [FECHA_DE] = @FECHA_DE
    WHERE ID_PRESTAMO = @ID_PRESTAMO;
GO

