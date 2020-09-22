--=======================create tables========================
CREATE EXTENSION pgcrypto;
drop table suppliers 
drop table products 
drop table order_items 

drop table orders 
drop table customers 

delete from suppliers 
delete from products 

CREATE TABLE CUSTOMERS(
   ID  SERIAL  primary key,
   first_name VARCHAR (100),    
   last_name VARCHAR(100),
   email VARCHAR(150) not null,
   password VARCHAR(500) NOT NULL,
   address  VARCHAR (150) ,
   city VARCHAR(150),
   postcode   VARCHAR(500), 
   country VARCHAR(150),
   mobile VARCHAR(500));
   
     
  CREATE TABLE orders(
   ID  int  primary key,	
   order_date DATE     NOT NULL,
   customer_id INT references customers(id)
   );
   
   CREATE TABLE order_items(
   ID  int  primary key,	
   order_id INT references orders(id),
   product_id INT references products(id),
   quantity INT not null 
   );
   
   

   
   CREATE TABLE products(
   ID  int  primary key,	
   product_name VARCHAR(500) not null,
   product_size VARCHAR(500),
   category VARCHAR(500),
   unit_price VARCHAR(500),
   image VARCHAR(500),
   supplier_id INT references suppliers(id) 
   );
      
   CREATE TABLE suppliers(
   ID  int  primary key,
   supplier_name VARCHAR (200),
   address  VARCHAR (150) not NULL,
   city VARCHAR(150),
   postcode   VARCHAR(200), 
   country VARCHAR(150) not NULL,
   email VARCHAR(150),
   mobile VARCHAR(200)
   );
   
   alter table suppliers add column postcode VARCHAR(200);
   --======================================Insert data into Customers table=====================================
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Shaheen', 'Akond', 'akondshaheen.es@gmail.com', crypt('randompass',gen_salt('bf')), 'Carrer de la Riereta 24', 'Barcelona', 08001, 'Spain', 602648298);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Lino E.', 'Urdiales Matus', 'linoman.es@gmail.com', crypt('linorandom',gen_salt('bf')), 'Carrer de Ferrocarrils 54', 'Barcelona', 08038, 'Spain', 603434332);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Joaquin', 'Diez', 'joaquin.es@gmail.com', crypt('joaquinrandom',gen_salt('bf')), 'Carrer de catalan 44', 'Barcelona', 08001, 'Spain', 602444232);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Ricardo', 'Delgado', 'ricardo.es@gmail.com', crypt('ricardorandom',gen_salt('bf')), 'Carrer de Canalejas 33', 'Barcelona', 08028, 'Spain', 602332432);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Viktoryia', 'Mamantava', 'viktoryia.es@gmail.com', crypt('viktoryiarandom',gen_salt('bf')), 'Carrer de catalunya 77', 'Barcelona', 08001, 'Spain', 602444343);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Vincent', 'Van', 'vincent.es@gmail.com', crypt('vincentrandom',gen_salt('bf')), 'Carrer de fondo 24', 'Barcelona', 08001, 'Spain', 603433433);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Carlos', 'Sancez', 'carlos.es@gmail.com', crypt('carlosrandom',gen_salt('bf')), 'Carrer de Caritas 55', 'Barcelona', 08001, 'Spain', 602343338);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Jay', 'Nebhwani', 'Jay.es@gmail.com', crypt('jayrandom',gen_salt('bf')), 'Carrer de la universitat 37', 'Barcelona', 08001, 'Spain', 602333242);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Antonio', 'Miranda', 'antonio.es@gmail.com', crypt('antoniorandom',gen_salt('bf')), 'Carrer de la shabadell 77', 'Barcelona', 08001, 'Spain', 602344366);
   insert into customers (first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES('Juan', 'Londono', 'juan.es@gmail.com', crypt('juanrandom',gen_salt('bf')), 'Carrer de la hostpitalet 93', 'Barcelona', 080398, 'Spain', 602688305)
   
//==============================================================orders==========================================================

insert into orders (id, order_date, customer_id) values (1, '2020-08-10', 1);
insert into orders (id, order_date, customer_id) values (2, '2020-08-11', 4);
insert into orders (id, order_date, customer_id) values (3, '2020-08-12', 5);
insert into orders (id, order_date, customer_id) values (4, '2020-08-13', 2);
insert into orders (id, order_date, customer_id) values (5, '2020-08-14', 3);
insert into orders (id, order_date, customer_id) values (6, '2020-08-15', 10);
insert into orders (id, order_date, customer_id) values (7, '2020-08-16', 9);
insert into orders (id, order_date, customer_id) values (8, '2020-08-17', 6);
insert into orders (id, order_date, customer_id) values (9, '2020-08-18', 8);
insert into orders (id, order_date, customer_id) values (10, '2020-08-19', 7)

//============================================================== order_items ==========================================================

insert into order_items (id, order_id, product_id, quantity) values (1, 4, 2, 5);
insert into order_items (id, order_id, product_id, quantity) values (2, 2, 6, 2);
insert into order_items (id, order_id, product_id, quantity) values (3, 1, 14, 6);
insert into order_items (id, order_id, product_id, quantity) values (4, 5, 18, 1);
insert into order_items (id, order_id, product_id, quantity) values (5, 8, 19, 1);
insert into order_items (id, order_id, product_id, quantity) values (6, 9, 12, 2);
insert into order_items (id, order_id, product_id, quantity) values (7, 2, 12, 5);
insert into order_items (id, order_id, product_id, quantity) values (8, 4, 13, 6);
insert into order_items (id, order_id, product_id, quantity) values (9, 1, 17, 1);
insert into order_items (id, order_id, product_id, quantity) values (10, 7, 19, 7);
insert into order_items (id, order_id, product_id, quantity) values (11, 9, 13, 1);
insert into order_items (id, order_id, product_id, quantity) values (12, 2, 17, 4);
insert into order_items (id, order_id, product_id, quantity) values (13, 7, 14, 7);
insert into order_items (id, order_id, product_id, quantity) values (14, 8, 13, 9);
insert into order_items (id, order_id, product_id, quantity) values (15, 1, 13, 5);


//======================================Suppiers============================
update suppliers set supplier_name='Migra' where id=1;
update suppliers set supplier_name='Akond' where id=2;
update suppliers set supplier_name='BCN' where id=3;
update suppliers set supplier_name='HASAN' where id=4;
update suppliers set supplier_name='OCC' where id=5;
update suppliers set supplier_name='Orange' where id=6;
update suppliers set supplier_name='Autotrader' where id=7;
update suppliers set supplier_name='etailor' where id=8;
update suppliers set supplier_name='Primark' where id=9;
update suppliers set supplier_name='Next' where id=10;

//======================================products============================
update products set product_size ='S',supplier_id=2 where id=1;
update products set product_size ='M',supplier_id=1 where id=2;
update products set product_size ='XL',supplier_id=3 where id=3;
update products set product_size ='L',supplier_id=5 where id=4;
update products set product_size ='XXL',supplier_id=7 where id=5;
update products set product_size ='XS',supplier_id=8 where id=6;
update products set product_size ='M',supplier_id=2 where id=7;
update products set product_size ='L',supplier_id=9 where id=8;
update products set product_size ='XXL',supplier_id=10 where id=9;
update products set product_size ='M',supplier_id=1 where id=10;
update products set product_size ='L',supplier_id=6 where id=11;
update products set product_size ='S',supplier_id=5 where id=12;
update products set product_size ='M',supplier_id=4 where id=13;
update products set product_size ='S',supplier_id=3 where id=14;
update products set product_size ='XS',supplier_id=9 where id=15;
update products set product_size ='XXL',supplier_id=3 where id=16;
update products set product_size ='L',supplier_id=7 where id=17;
update products set product_size ='XXXL',supplier_id=1 where id=18;
update products set product_size ='L',supplier_id=2 where id=19;
update products set product_size ='S',supplier_id=5 where id=20;




