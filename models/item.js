const mysqlConnetion = require("../connection");

class Item {
  constructor(name, username, id) {
    this.name = name;
    this.username = username;
    this.id = id;

  }

  static insert(new_item, username) {
    if(username){
      return new Promise((resolve, reject) => {
        mysqlConnetion.query(`INSERT INTO items(name, username) VALUES('${new_item}', '${username}')`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
        });
    })
    }else{
      return new Promise((resolve, reject) => {
        mysqlConnetion.query(`INSERT INTO items(name) VALUES('${new_item}')`, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
        });
    })
    }

  }

  static getAll() {
      return new Promise((resolve, reject) => {
        mysqlConnetion.query("SELECT * from items", (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
        });
    })
        
  }

  static getAllUserItems(username) {
    return new Promise((resolve, reject) => {
      mysqlConnetion.query(`SELECT * from items WHERE username='${username}'`, (err, rows, fields) => {
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
}
module.exports = Item;
