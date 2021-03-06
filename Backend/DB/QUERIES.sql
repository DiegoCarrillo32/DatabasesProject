
-- INFORMACION DE USUARIO CON UN AREA ASIGNADA
USE INVENTARIO_IACSA
SELECT CONCAT(NOMBRE_USUARIO.NOMBRE, ' ', APELLIDO1,' ', APELLIDO2) AS 'NOMBRE COMPLETO', * FROM USUARIOS
INNER JOIN AREA
    ON USUARIOS.ID_USUARIO = AREA.ENCARGADO
INNER JOIN NOMBRE_USUARIO
    ON USUARIOS.ID_USUARIO = NOMBRE_USUARIO.ID_USUARIO
ORDER BY NOMBRE_USUARIO.NOMBRE

--CONTIENE EL NUMERO DE PRESTAMOS QUE SOLICITÓ CADA USUARIO 
SELECT NU.ID_USUARIO,SOL.CANTIDAD_PRESTAMO,NU.NOMBRE,NU.APELLIDO1 FROM NOMBRE_USUARIO AS NU 
INNER JOIN (SELECT SOL.ID_USUARIO,(COUNT(SOL.ID_USUARIO)) AS CANTIDAD_PRESTAMO FROM SOLICITANTE AS SOL 
GROUP BY SOL.ID_USUARIO) AS SOL ON (SOL.ID_USUARIO = NU.ID_USUARIO)

--CANTIDAD DE ACTIVOS QUE POSEE CADA AREA
SELECT A.ID_AREA,A.NOMBRE,CANT.C_ACTIVOS AS 'CANTIDAD DE ACTIVOS' 
FROM AREA AS A INNER JOIN (SELECT COUNT(ID_AREA) AS C_ACTIVOS,ACT.ID_AREA 
FROM ACTIVOS AS ACT GROUP BY ACT.ID_AREA ) AS CANT ON (A.ID_AREA = CANT.ID_AREA)

--MUESTRA LOS ACTIVOS QUE TIENEN MOROSIDAD EN EL PRESTAMO
SELECT ACT.ID_ACTIVO,ACT.NOMBRE_ACTIVO,C_A.ESTADO_ACTIVO FROM ACTIVOS AS ACT INNER JOIN (SELECT ID_ACTIVO,ESTADO_ACTIVO 
FROM CONTROL_ACTIVOS WHERE ESTADO_ACTIVO = 'PRESENTA MOROSIDAD') AS C_A ON (C_A.ID_ACTIVO=ACT.ID_ACTIVO)

--CONSULTA POR LOS ACTIVOS QUE HAN SIDO DEVUELTOS DEL PRESTAMO; 0 DEVUELTO 1 PRESTADO
SELECT P.ID_PRESTAMO,P.ID_ACTIVO,NOMBRE_ACTIVO FROM ACTIVOS AS ACT INNER JOIN (SELECT ID_ACTIVO,ID_PRESTAMO,ESTADO FROM PRESTAMOS 
WHERE 0=PRESTAMOS.ESTADO) AS P ON (P.ID_ACTIVO = ACT.ID_ACTIVO) ORDER BY P.ID_PRESTAMO