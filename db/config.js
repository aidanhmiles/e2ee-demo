module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "db",
    "port": "3306",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql"
  },
  "demo": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "ebdb",
    "host": "aa1mxw2g1ynzf14.ckzwbjelkyk1.us-west-2.rds.amazonaws.com",
    "port": "3306",
    "dialect": "mysql"
  }
}
