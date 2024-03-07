const db = require('../dbConnection');

exports.getAllartikel = (req, res) => {
    db.query('SELECT * FROM artikel', (error, results, fields) => {
      if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
    });
};

exports.getartikelById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM artikel WHERE id_artikel = ?', id, (error, results, fields) => {
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

exports.addartikel = (req, res) => {
    const {judul, konten, penulis, tanggal_publikasi, gambar } = req.body;
    db.query(
      'INSERT INTO artikel ( judul, konten, penulis, tanggal_publikasi, gambar) VALUES (?, ?, ?, ?, ?)',
      [judul, konten, penulis, tanggal_publikasi, gambar],
      (error, results, fields) => {
        if (error) {
          console.error('Error adding data:', error);
          return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        return res.status(201).json({ error: false, message: 'Data added successfully.' });
      }
    );
};

exports.deleteartikel = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM artikel WHERE id_artikel = ?', id, (error, results, fields) => {
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

exports.updateartikel = async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;
  
    try {
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: true, message: 'No fields to update' });
      }
  
      const result = await db.query('UPDATE artikel SET ? WHERE id_artikel = ?', [updateFields, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: true, message: 'Data not found' });
      }
  
      return res.json({ error: false, message: 'Data updated successfully.' });
    } catch (error) {
      console.error('Error updating data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};
