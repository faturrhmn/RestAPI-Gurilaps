const db = require('../dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  // Cek apakah email sudah terdaftar
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This email is already in use!'
        });
      } else {
        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: 'Error hashing password'
            });
          } else {
            // Tambahkan user ke database
            db.query(
              `INSERT INTO users (name, email, password) VALUES (${db.escape(
                name
              )}, ${db.escape(email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: 'Error registering user'
                  });
                }
                return res.status(201).send({
                  msg: 'User registered successfully'
                });
              }
            );
          }
        });
      }
    }
  );
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Cek apakah user dengan email yang diberikan ada
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(email)};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: 'Error checking user'
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }

      // Bandingkan password yang dihash dengan password yang dimasukkan
      bcrypt.compare(password, result[0].password, (bErr, bResult) => {
        if (bErr || !bResult) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }

        // Buat token JWT
        const token = jwt.sign(
          {
            id: result[0].id,
            email: result[0].email
          },
          'secret_key',
          {
            expiresIn: '1h'
          }
        );

        return res.status(200).send({
          msg: 'Logged in successfully!',
          token
        });
      });
    }
  );
};
