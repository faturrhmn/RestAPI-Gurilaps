const db = require('../dbConnection');

exports.getAllevent = (req, res) => {
    // Mendapatkan data event publik
    db.query('SELECT * FROM events', (error, results, fields) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
    });
};

exports.geteventById = (req, res) => {
    const id = req.params.id;
    // Mendapatkan data event publik berdasarkan ID
    db.query('SELECT * FROM events WHERE id_event = ?', id, (error, results, fields) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: true, message: 'Data not found' });
      }
      return res.json({ error: false, data: results[0], message: 'Data retrieved successfully.' });
    });
};

exports.addevent = (req, res) => {
    const { id_admin, nama, tanggal, lokasi, deskripsi } = req.body;
    // Menambahkan data event baru
    db.query(
      'INSERT INTO events (id_admin, nama, tanggal, lokasi, deskripsi) VALUES (?, ?, ?, ?, ?)',
      [id_admin, nama, tanggal, lokasi, deskripsi],
      (error, results, fields) => {
        if (error) {
          console.error('Error adding data:', error);
          return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        return res.status(201).json({ error: false, message: 'Data added successfully.' });
      }
    );
};

exports.deleteevent = (req, res) => {
    const id = req.params.id;
    // Menghapus data event berdasarkan ID
    db.query('DELETE FROM events WHERE id_event = ?', id, (error, results, fields) => {
      if (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: true, message: 'Data not found' });
      }
      return res.json({ error: false, message: 'Data deleted successfully.' });
    });
};

exports.updateevent = async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;
  
    try {
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: true, message: 'No fields to update' });
      }
  
      // Memperbarui data event berdasarkan ID
      const result = await db.query('UPDATE events SET ? WHERE id_event = ?', [updateFields, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: true, message: 'Data not found' });
      }
  
      return res.json({ error: false, message: 'Data updated successfully.' });
    } catch (error) {
      console.error('Error updating data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};
