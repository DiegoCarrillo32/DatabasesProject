USE INVENTARIO_IACSA
GO

CREATE OR ALTER VIEW USUARIO_PRESTAMO_VIEW
AS 

        
        SELECT  CONCAT(NOMU.NOMBRE, ' ', NOMU.APELLIDO1, ' ', NOMU.APELLIDO2) AS 'NOMBRE COMPLETO',
        NOMU.ID_USUARIO ,SOL.ID_PRESTAMO, PRES.ESTADO, PRES.FECHA_SO, PRES.FECHA_DE FROM SOLICITANTE AS SOL 
        INNER JOIN NOMBRE_USUARIO AS NOMU ON SOL.ID_USUARIO = NOMU.ID_USUARIO
        INNER JOIN PRESTAMOS AS PRES ON PRES.ID_PRESTAMO = SOL.ID_PRESTAMO
        WHERE PRES.ESTADO = 1
        
    GO
    
    
GO

SELECT * FROM USUARIO_PRESTAMO_VIEW
GO
SELECT * FROM PRESTAMOS
