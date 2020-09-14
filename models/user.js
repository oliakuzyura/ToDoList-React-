const mysqlConnetion = require("../connection");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static insert(new_user) {
    return new Promise((resolve, reject) => {
        mysqlConnetion.query(`INSERT INTO users(username, email, password) VALUES('${new_user.username}', '${new_user.email}', '${new_user.password}')`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
        });
    })
  }

  static getAll() {
      return new Promise((resolve, reject) => {
        mysqlConnetion.query("SELECT * from users", (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
        });
    })
        
  }


  static update(id, Item) {
    return new Promise((resolve, reject) => {
      mysqlConnetion.query(`UPDATE items SET name='${Item}' WHERE id='${id}'`, (err, rows, fields) => {
              if (!err) {
                  resolve(rows);
              }
              else {
                  reject(err);
              }
      });
  })
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
        mysqlConnetion.query(`DELETE FROM items WHERE id="${id}"`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    console.log(err);
                }
        });
    })
  }

  static console(){
    console.log('Olga');
  }
}
module.exports = User;
