CREATE DATABASE dannys_diner;
CREATE SCHEMA dannys_diner;

CREATE TABLE sales 
(
  "customer_id" VARCHAR(1),
  "order_date" DATE,
  "product_id" INTEGER,
  primary key (customer_id),
  foreign key (customer_id) references members(customer_id) on delete cascade,
  foreign key (product_id) references menu(product_id) on delete cascade
);

CREATE TABLE menu (
  "product_id" INTEGER,
  "product_name" VARCHAR(5),
  "price" INTEGER,
  primary key (product_id)
);

CREATE TABLE members (
  "customer_id" VARCHAR(1),
  "join_date" DATE,
  primary key (customer_id)
);