SELECT equipos.id, marca, modelo FROM equipos
	INNER JOIN marcas
    ON equipos.marca_id = marcas.id
    INNER JOIN modelos 
    ON equipos.modelo_id = modelos.id
;

INSERT INTO clientes(nombre, num_telefono) VALUES 
("Jonas Gibson", "+9996188305932"),
("Flossie Corwin", "+6673207770389"),
("Zachary Blick", "+1732197043348"),
("Braden Ullrich", "+8985426629563"),
("Sallie Rath", "+8359287101664"),
("Gerardo Mills", "+8553510197555"),
("Katrina Pfannerstill", "+3296789429658"),
("Marisa Konopelski", "+2462375177376"),
("Mabelle McClure", "+8251332862055"),
("Dayna Runolfsdottir", "+7698297916620");

INSERT INTO equipos (marca_id, modelo_id) VALUES
(3, 1),
(2, 2),
(4, 3),
(4, 4),
(3, 5),
(3, 6),
(2, 7),
(3, 8),
(2, 9),
(4, 10),
(4, 11),
(3, 12),
(3, 13),
(2, 14);