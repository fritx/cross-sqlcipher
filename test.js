// https://github.com/delaballe/node-sqlcipher#usage
// https://coolaj86.com/articles/building-sqlcipher-for-node-js-on-raspberry-pi-2/
'use strict';
var sqlite3 = require('./').verbose();
var db = new sqlite3.Database('test.db');

db.serialize(function() {
  db.run("PRAGMA KEY = 'secret'");
  db.run("PRAGMA CIPHER = 'aes-128-cbc'");

  db.run("DROP TABLE IF EXISTS lorem");
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    console.log(row.id + ": " + row.info);
  });
});

db.close();
