'use strict';

const client = require('../pool');

class AdminCollection {
  constructor() {}

  async getBuyers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,first_name,last_name,adress,telephone,gender,card_number from buyer inner join users on buyer.u_id = users.u_id where users.user_role ='buyer' LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }

  async getSellers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,company_name,adress,telephone from seller inner join users on seller.u_id = users.u_id where users.user_role ='seller' LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }

  async toggleUser(id) {
    let updateQuery = `UPDATE users set is_activated= NOT is_activated WHERE u_id=$1 Returning user_name,is_activated`;
    let safeValues = [id];
    return await client
      .query(updateQuery, safeValues)
      .then((result) => result.rows[0]);
  }

  async toggleComments(table, id) {
    let updateQuery = `UPDATE ${table} set is_deleted= NOT is_deleted WHERE u_id=$1 Returning user_name,is_deleted`;
    let safeValues = [id];
    return await client
      .query(updateQuery, safeValues)
      .then((result) => result.rows[0]);
  }
}

module.exports = new AdminCollection();
