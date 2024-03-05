const axios = require('axios');
const dbConfig = require('../dbConnection'); 
const jwt = require('jsonwebtoken');

exports.googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
      const data = response.data;
      // Check if user exists in your database
      const userQuery = "SELECT * FROM users WHERE google_id = ?";
      const result = await dbConfig.query(userQuery, [data.sub]);
      let user = result[0]; // Adjust based on your DB library's response structure
      let userId;
      if (!user || user.length === 0) {
        // If user does not exist, create a new user record
        const insertQuery = "INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)";
        const insertResult = await dbConfig.query(insertQuery, [data.sub, data.email, data.name, data.picture]);
        userId = insertResult.insertId; // Adjust based on your DB library's response structure
      } else {
        userId = user[0].id; // Adjust if necessary based on your DB library's response structure
      }
      // Issue JWT token
      const jwtToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Authentication successful", token: jwtToken });
    } catch (error) {
      res.status(400).json({ message: "Invalid token", error: error.response ? error.response.data : error.message });
    }
};
