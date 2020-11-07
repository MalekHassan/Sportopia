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
    oauth_token VARCHAR
(255),
 user_role roles,
 is_activated boolean
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
    gender user_gender,
    card_number VARCHAR
(255)
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
    name VARCHAR
(255),
    describtion TEXT,
    main_img TEXT,
    images text ARRAY,
    price INTEGER,
    category_id integer REFERENCES category
(id),
    quaintitny INTEGER,
    is_deleted boolean
);

CREATE TABLE
IF NOT EXISTS buyer_favorite
(
    id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES buyer
(id),
     p_id INTEGER REFERENCES products
(id),
    is_deleted boolean
);

CREATE TABLE
IF NOT EXISTS buyer_cart
(
    id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES buyer
(id),
     p_id INTEGER REFERENCES products
(id),
    quaintitny INTEGER,
    is_bought boolean
);

CREATE TABLE
IF NOT EXISTS buyer_comments
(
    id SERIAL PRIMARY KEY,
    u_c_id INTEGER REFERENCES buyer_cart
(id),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean
);
