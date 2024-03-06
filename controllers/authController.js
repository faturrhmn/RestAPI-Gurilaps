const axios = require('axios');
const dbConfig = require('../dbConnection'); 
const jwt = require('jsonwebtoken');

exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    const data = response.data;
    console.log(data);
    // Ensure google_id is treated as a string to avoid precision issues
    const userQuery = "SELECT * FROM users WHERE google_id = ?";
    const result = await dbConfig.query(userQuery, [data.sub.toString()]); // Convert to string if not already
    let user = result[0];
    let userId;
    if (!user || user.length === 0) {
      const insertQuery = "INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)";
      const insertResult = await dbConfig.query(insertQuery, [data.sub.toString(), data.email, data.name, data.picture]); // Ensure ID is stored as a string
      userId = insertResult.insertId;
    } else {
      userId = user[0].id;
    }
    const jwtToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Authentication successful", token: jwtToken });
  } catch (error) {
    res.status(400).json({ message: "Invalid token", error: error.response ? error.response.data : error.message });
  }
};
