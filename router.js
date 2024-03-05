const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', signupValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This user is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(
                req.body.email
              )}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'The user has been registerd with us!'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/login', loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

router.post('/get-user', signupValidation, (req, res, next) => {


    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });


});

router.post('/data-wisata', signupValidation, (req, res, next) => {


    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    db.query('SELECT * FROM wisata', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Fetch Successfully.' });
  });
});

router.post('/public-data-wisata', (req, res) => {
  db.query('SELECT * FROM wisata', function (error, results, fields) {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
  });
});

router.get('/public-data-wisata', (req, res) => {
  db.query('SELECT * FROM wisata', function (error, results, fields) {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
  });
});

router.get('/public-data-wisata/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM wisata WHERE id = ?', id, function (error, results, fields) {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: true, message: 'Data not found' });
    }
    return res.json({ error: false, data: results[0], message: 'Data retrieved successfully.' });
  });
});

router.post('/add-data-wisata', (req, res) => {
  const { nama_wisat, lat, lon, desa, kec, kab, alamat, rating_awal, deskripsi, gambar } = req.body;
  db.query('INSERT INTO wisata (nama_wisat, lat, lon, desa, kec, kab, alamat, rating_awal, deskripsi, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [nama_wisat, lat, lon, desa, kec, kab, alamat, rating_awal, deskripsi, gambar], 
      function (error, results, fields) {
          if (error) {
              console.error('Error creating wisata:', error);
              return res.status(500).json({ error: true, message: 'Internal Server Error' });
          }
          return res.status(201).json({ error: false, message: 'Wisata created successfully.' });
  });
});

router.delete('/delete-data-wisata/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM wisata WHERE id = ?', id, function (error, results, fields) {
    if (error) {
      console.error('Error deleting wisata:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Wisata not found' });
    }
    return res.json({ error: false, message: 'Wisata deleted successfully.' });
  });
});



module.exports = router;
