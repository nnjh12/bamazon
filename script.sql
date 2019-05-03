CREATE database top_bamazon;

USE top_bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bike", "sports", 35, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("scooter", "sports", 40, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lego", "blocks", 20, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("megablock", "blocks", 15, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chalk", "art", 1, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("crayons", "art", 2, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drum", "music", 100, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xylophone", "music", 50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Where's spot?", "book", 10, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Are you a cow?", "book", 10, 5);

SELECT * FROM products;

UPDATE products SET stock_quantity=stock_quantity+3 WHERE item_id=1;

UPDATE products SET stock_quantity=3 WHERE item_id=9;

delete from products WHERE item_id=11;
