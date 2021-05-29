CREATE TABLE IF NOT EXISTS users (
	user_id serial  PRIMARY KEY,
   	fname varchar(255) NOT NULL,
   	lname varchar(255) NOT NULL,
   	email varchar(255) UNIQUE NOT NULL,
	password varchar(255),
	createdAt TIMESTAMP 
);

------------------
CREATE TABLE IF NOT EXISTS roles (
	role_id serial  PRIMARY KEY,
   	role_name varchar(255) UNIQUE NOT NULL
);
------------------
CREATE TABLE IF NOT EXISTS user_roles (
	user_id INT NOT NULL,
	role_id INT NOT NULL,
   	createdAt TIMESTAMP,
	PRIMARY KEY (user_id,role_id),
	FOREIGN KEY (role_id) REFERENCES roles(role_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);
---------------------
insert into users ("fname", "lname", "email", "password","createdAt") values ('Dorise', 'Pattullo', 'dpattullo0@dropbox.com', 'wlAStFc',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Erma', 'Galley', 'egalley1@ihg.com', 'Gpu5UBaQ',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Eva', 'Wolfer', 'ewolfer2@arstechnica.com', 'QazoSpVlkn',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Clerc', 'Edsell', 'cedsell3@usnews.com', 'faYWnDz',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Chic', 'Foye', 'cfoye4@free.fr', '5UliW29Hu',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Hewie', 'Shavel', 'hshavel5@istockphoto.com', 'oiP0SxV5qZ',CURRENT_TIMESTAMP);
insert into users ("fname", "lname", "email", "password","createdAt") values ('Abed', 'Tikkawi', 'abed@gmail.com', '12345',CURRENT_TIMESTAMP);
--------------------
