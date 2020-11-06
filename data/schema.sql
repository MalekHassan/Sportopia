CREATE TYPE roles AS ENUM
('admin', 'seller', 'buyer');
CREATE TYPE user_gender AS ENUM
('male', 'female');

CREATE TABLE
IF NOT EXISTS users
(
 u_id SERIAL PRIMARY KEY,
 user_name VARCHAR
(255),
 user_password VARCHAR
(255),
 token VARCHAR
(255),
 user_role roles
);

CREATE TABLE
IF NOT EXISTS buyer
(
     id SERIAL PRIMARY KEY,
    u_id integer REFERENCES users
(u_id),
    first_name VARCHAR
(255),
    last_name VARCHAR
(255),
    adress VARCHAR
(255),
    telephone VARCHAR
(255),
    gender user_gender
);

CREATE TABLE
IF NOT EXISTS seller
(
    id SERIAL PRIMARY KEY,
    u_id integer REFERENCES users
(u_id),
    company_name VARCHAR
(255),
    adress VARCHAR
(255),
    telephone VARCHAR
(255)
);


CREATE TABLE
IF NOT EXISTS category
(
    id SERIAL PRIMARY KEY,
    
    category_name VARCHAR
(255)
);

CREATE TABLE
IF NOT EXISTS products
(
    id SERIAL PRIMARY KEY,
    seller_id integer REFERENCES seller
(id),
    describtion TEXT,
    main_img TEXT,
    images text ARRAY,
    price INTEGER,
    category_id integer REFERENCES category
(id)
);

CREATE TABLE
If NOT EXISTS user_product
(
    id SERIAL PRIMARY KEY,
    u_id integer REFERENCES buyer
(id),
    p_id INTEGER REFERENCES products
(id),
    comment TEXT
)



  