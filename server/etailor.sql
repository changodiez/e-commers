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
   ID serial  int  primary key,
   first_name VARCHAR (100)     NOT NULL,
   last_name VARCHAR(100) not null,
   email VARCHAR(150),
   password VARCHAR(500),
   address  VARCHAR (150) ,
   city VARCHAR(150),
   postcode   VARCHAR(500), 
   country VARCHAR(150),
   mobile VARCHAR(500))
   
     
  CREATE TABLE orders(
   ID serial  int  primary key,	
   order_date DATE default NOW(),
   customer_id INT references customers(id),
   status boolean default (false)
   )
   
   CREATE TABLE order_items(
   ID serial int  primary key,	
   order_id INT references orders(id),
   product_id INT references products(id),
   quantity INT default (1)
   )
   
   

   
   CREATE TABLE products(
   ID serial int  primary key,	
   product_name VARCHAR(500) not null,
   category VARCHAR(500),
   unit_price VARCHAR(500),
   image VARCHAR(500),
   supplier_id INT references suppliers(id) 
   )
      
   CREATE TABLE suppliers(
   ID serial  int  primary key,
   supplier_name VARCHAR (200),
   address  VARCHAR (150) not NULL,
   city VARCHAR(150),
   postcode   VARCHAR(200), 
   country VARCHAR(150) not NULL,
   email VARCHAR(150),
   mobile VARCHAR(200)
   )
   
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

insert into orders (order_date, customer_id) values ('2020-08-10', 1);
insert into orders (order_date, customer_id) values ('2020-08-11', 4);
insert into orders (order_date, customer_id) values ('2020-08-12', 5);
insert into orders (order_date, customer_id) values ('2020-08-13', 2);
insert into orders (order_date, customer_id) values ('2020-08-14', 3);
insert into orders (order_date, customer_id) values ('2020-08-15', 10);
insert into orders (order_date, customer_id) values ('2020-08-16', 9);
insert into orders (order_date, customer_id) values ('2020-08-17', 6);
insert into orders (order_date, customer_id) values ('2020-08-18', 8);
insert into orders (order_date, customer_id) values ('2020-08-19', 7)

//============================================================== order_items ==========================================================


insert into order_items (order_id, product_id, quantity) values (4, 2, 5);
insert into order_items (order_id, product_id, quantity) values (2, 6, 2);
insert into order_items (order_id, product_id, quantity) values (1, 14, 6);
insert into order_items (order_id, product_id, quantity) values (5, 18, 1);
insert into order_items (order_id, product_id, quantity) values (8, 19, 1);
insert into order_items (order_id, product_id, quantity) values (9, 12, 2);
insert into order_items (order_id, product_id, quantity) values (2, 12, 5);
insert into order_items (order_id, product_id, quantity) values (4, 13, 6);
insert into order_items (order_id, product_id, quantity) values (1, 17, 1);
insert into order_items (order_id, product_id, quantity) values (7, 19, 7);
insert into order_items (order_id, product_id, quantity) values (9, 13, 1);
insert into order_items (order_id, product_id, quantity) values (2, 17, 4);
insert into order_items (order_id, product_id, quantity) values (7, 14, 7);
insert into order_items (order_id, product_id, quantity) values (8, 13, 9);
insert into order_items (order_id, product_id, quantity) values (1, 13, 5);


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




//=========================================add column to order================================
alter table orders drop column status  boolean;
alter table orders drop column order_date;
ALTER TABLE products ALTER id SET DEFAULT (0)

alter table orders add column order_date   date default NOW();
alter table orders add column status boolean default (false);

delete  from orders 
delete from order_items


alter table orders set order_id=1 where product_id=2

delete from order_items where id=38






