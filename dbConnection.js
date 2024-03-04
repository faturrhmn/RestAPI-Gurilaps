
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: '202.157.184.149',
  user: 'gurilaps',
  password: 'jaswita6banget',      
  database: 'gurilaps' // 
  // host: '202.157.184.149', 
  // user: 'msibenam',   
  // password: 'magang',   
  // database: 'msiblagi' 
});
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
