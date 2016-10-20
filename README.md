# cross-sqlcipher

> Cross-platform encrypted sqlite3
> See also: [win-sqlcipher](https://github.com/fritx/win-sqlcipher), [unix-sqlcipher](https://github.com/fritx/unix-sqlcipher)

```sh
npm install cross-sqlcipher

# for NW.js (formally node-webkit)
npm i cross-sqlcipher --runtime=node-webkit --target=0.12.3 --target_arch=x64
```

```js
var sqlite3 = require('cross-sqlcipher').verbose();
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
```
