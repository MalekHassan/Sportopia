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
(u_id) ON
DELETE CASCADE ON
UPDATE CASCADE,
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
(u_id) ON
DELETE CASCADE ON
UPDATE CASCADE,
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
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
    name VARCHAR
(255),
    description TEXT,
    main_img TEXT,
    images text ARRAY,
    price INTEGER,
    category_id integer
REFERENCES category
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
    quantity INTEGER,
    is_deleted boolean,
    is_bid boolean,
    is_finished boolean,
    start_time TIMESTAMP
DEFAULT CURRENT_TIMESTAMP,
    end_time INTEGER
);

CREATE TABLE
If NOT EXISTS seller_notify
(
    id SERIAL PRIMARY KEY,
       s_id INTEGER REFERENCES seller
(id) ON
UPDATE CASCADE ON
DELETE CASCADE,
    p_id INTEGER
REFERENCES products
(id) ON
UPDATE CASCADE ON
DELETE CASCADE,
    u_id INTEGER
REFERENCES buyer
(id) ON
UPDATE CASCADE ON
DELETE CASCADE,
    created_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
IF NOT EXISTS buyer_favorite
(
    id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES buyer
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
     p_id INTEGER
REFERENCES products
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
    is_deleted boolean
);

CREATE TABLE
IF NOT EXISTS buyer_cart
(
    id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES buyer
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
     p_id INTEGER
REFERENCES products
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
    quantity INTEGER,
    is_bought boolean
);

CREATE TABLE
IF NOT EXISTS buyer_comments
(
    id SERIAL PRIMARY KEY,
    u_c_id INTEGER REFERENCES buyer_cart
(id) ON
DELETE CASCADE ON
UPDATE CASCADE,
    comment TEXT,
    created_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean
);
