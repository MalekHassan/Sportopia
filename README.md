# SportTopia

Sportopia is a sport product platform that connect buyers and sellers in one place to make it easy for seller to sell their product widely, also to help buyers find all sport products in one place, with many sports categories.

And there is a bidding part in the website that helps users to bid on certain product.

## Full Stack App

Sportopia is a full stack app which will be done in two main stages:

**version 0.0.1**


which is only handling these backend functionalities :

1- CRUD system for the sellers to add, update and delete their products. 
2- CRUD system for the buyers to add, update and delete products to their cart.
3- CRUD system for the buyers to add, update and delete products to their wishlist.
4- CRUD system for the buyers to add, update and delete products to their order list to be able to buy it.
5- add all the terms of reference for the admin.
6- add authorization system.
7- add authentication system.
8- apply socket.io to build our bidding feature.
9- use postgress for the database.
10- create fake database to be able to test all the functionalities in our code which includes: 

* inserting fake Category.
* inserting fake Users.
* inserting fake seller.
* inserting fake Product.
* inserting fake Buyer.
* inserting fake buyer Favorite.
* inserting fake buyer Cart.
* inserting fake Comment. 

and run a function to walk through these data and inserting them into our database.

11- build our schema file (database) with a lot of tables to handle all the features in our website, such as:

* users table.
* buyer table.
* seller table.
* category table.
* products table.
* buyer_favorite table.
* buyer_cart table.
* buyer_cart table.
* enable the users to sign up and sign in via facebook or google.
 
12- add rooms for products which have been listed for bidding.
13- use testing for all the functions.
14- get some statistics from the data that are coming for the website:

* sellers information.
* buyers information.
* products information.
* most bought products.
* comments statistics.
* ... etc

15- add functions to drop and create the database to make it easy for us.
16- build many middleware to handle our functions.


## Tasks Division:

we used trello to divide the tasks between us.

you can find the link [here](https://trello.com/b/atlbky6J/sportopia)

SAAM TEAM:

- Saif Al-Rawad
- Ahmad Yousef
- Aya Akrabawi
- Malek Hassan

## White Boarding:

we used miro website to draw anything we need to make it more obvious.

you can find the link of our work [here](https://miro.com/app/board/o9J_lfn5Ozc=/).

## Entity Relationship Diagram

as we said before that we used postgress for our database, since we have a lot of relations as our website requires.

so here are the relations:

![ERD](./assets/ERD.png)

## Relations:

- users table has a one-to-one relation with the seller table and bayer tables, u_id according to the rule.

- seller table has a relation with the products table, one-to-many each seller can have multiple product, but the product can only have one seller

- category table has a relation with the product table, one-to-many, each category have many products, and the product has one category.

- products and bayer's have many to many relation in table user_product, each product has multiple bayer's and each bayer can buy multiple products


## Domain Modeling:

![DomainModeling](assets/DomainModeling.jpg)

## How to use the app as backend:

to run the app on your local machine, run these command lines in your terminal:

1- to create the datbase:
```
psql
```
```
CREATE DATABASE <the name uo want>
```
```
\q
```
2- to connecting the schema to your database 
```
psql -f <path/to/schemaFile> -d <database-name>
```
3- to insert the fake data into your data base:
```
npm run fake
```
4- to drop and create your database:
```
npm run drop
```
5- to initialize the app:
```
npm init -y
```
6- to install dependencies:
```
npm i 
```
7- to start your server:
```
nodemon
```
this will show you the prot that will run the app on it, then go to your browser and hit this url:

http://localhost/:<PORT>

dependencies
  * @types/jest
  * base-64
  * bcrypt
  * colors
  * cors
  * dotenv
  * express
  * faker
  * http
  * jsonwebtoken
  * morgan
  * passport-facebook
  * passport
  * pg
  * pgtools
  * socket.io
  * socket.io-client
  * superagent
  
  * devDependencies
  * eslint
  * husky
  * jest
  * prettier
  * pretty-quick
  * supertest

## Sportopia Tree

```
.
├── LICENSE
├── README.md
├── USER_STORIES.md
├── __test__
│   ├── 404.test.js
│   ├── 500.test.js
│   └── seller.test.js
├── assets
│   ├── DomainModeling.jpg
│   └── ERD.png
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   └── src
│   │       ├── index.html
│   │       ├── middleware
│   │       │   ├── comment_n_product.js.html
│   │       │   ├── index.html
│   │       │   ├── isActivated.js.html
│   │       │   └── isAuthoroized.js.html
│   │       ├── models
│   │       │   ├── OAuth
│   │       │   │   ├── facebook.js.html
│   │       │   │   ├── google.js.html
│   │       │   │   └── index.html
│   │       │   ├── index.html
│   │       │   ├── middleware
│   │       │   │   ├── 404.js.html
│   │       │   │   ├── 500.js.html
│   │       │   │   ├── acl.js.html
│   │       │   │   ├── basicAuth.js.html
│   │       │   │   ├── bearerAuth.js.html
│   │       │   │   └── index.html
│   │       │   ├── pool.js.html
│   │       │   ├── products
│   │       │   │   ├── buyerProduct-collection.js.html
│   │       │   │   ├── cartProduct-collection.js.html
│   │       │   │   ├── favoriteProduct-collection.js.html
│   │       │   │   ├── index.html
│   │       │   │   └── products-collection.js.html
│   │       │   └── users
│   │       │       ├── admin-collection.js.html
│   │       │       ├── index.html
│   │       │       └── users-collection.js.html
│   │       ├── routes
│   │       │   ├── admin.js.html
│   │       │   ├── buyerpeoducts.js.html
│   │       │   ├── cartproducts.js.html
│   │       │   ├── favoriteproducts.js.html
│   │       │   ├── index.html
│   │       │   ├── sellerproducts.js.html
│   │       │   └── signing.js.html
│   │       └── server.js.html
│   └── lcov.info
├── data
│   ├── drop_n_create.js
│   ├── fake-data.js
│   └── schema.sql
├── index.js
├── package-lock.json
├── package.json
├── public
│   ├── bidding.html
│   ├── index.html
│   └── index_static.js
├── softwareRequirements.md
└── src
    ├── bedding.js
    ├── middleware
    │   ├── comment_n_product.js
    │   ├── isActivated.js
    │   └── isAuthoroized.js
    ├── models
    │   ├── OAuth
    │   │   ├── facebook.js
    │   │   └── google.js
    │   ├── middleware
    │   │   ├── 404.js
    │   │   ├── 500.js
    │   │   ├── acl.js
    │   │   ├── basicAuth.js
    │   │   └── bearerAuth.js
    │   ├── pool.js
    │   ├── products
    │   │   ├── buyerProduct-collection.js
    │   │   ├── cartProduct-collection.js
    │   │   ├── favoriteProduct-collection.js
    │   │   └── products-collection.js
    │   └── users
    │       ├── admin-collection.js
    │       └── users-collection.js
    ├── routes
    │   ├── admin.js
    │   ├── buyerpeoducts.js
    │   ├── cartproducts.js
    │   ├── favoriteproducts.js
    │   ├── sellerproducts.js
    │   └── signing.js
    └── server.js

    ```