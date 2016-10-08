# cross-sqlcipher

> Cross-platform encrypted sqlite3
> See also: [win-sqlcipher](https://github.com/fritx/win-sqlcipher), [unix-sqlcipher](https://github.com/fritx/unix-sqlcipher)

```sh
npm install cross-sqlcipher
```

```js
var sqlite3 = require('cross-sqlcipher').verbose();
var db = new sqlite3.Database('test.db');

db.serialize(function() {
  db.run("PRAGMA KEY = 'secret'");
  db.run("PRAGMA CIPHER = 'aes-128-cbc'");

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

## Credits

- https://github.com/mapbox/node-sqlite3#building-for-sqlcipher
- https://coolaj86.com/articles/building-sqlcipher-for-node-js-on-raspberry-pi-2/
- https://github.com/delaballe/node-sqlcipher#usage
- https://github.com/liubiggun/node-sqlite3/commits/master
