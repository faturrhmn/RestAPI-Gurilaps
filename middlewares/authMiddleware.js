const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: true, message: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: true, message: 'Failed to authenticate token' });
    }
    // Jika verifikasi token berhasil, simpan informasi user yang terotentikasi dalam req.user
    req.user = decoded;
    next();
  });
};
