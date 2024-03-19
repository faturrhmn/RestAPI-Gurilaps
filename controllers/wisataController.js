const db = require('../dbConnection');

exports.getPublicData = (req, res) => {
  // Mendapatkan data wisata publik
  db.query('SELECT * FROM wisata', (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
    return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
  });
};

exports.getPublicDataById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT wisata.* FROM wisata WHERE wisata.id_wisata = ?', id, (error, results, fields) => {
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

exports.addData = (req, res) => {
  const { nama_wisata, lat, lon, kelurahan, kecamatan, kab_kota, alamat, kategori } = req.body;
  // Menambahkan data wisata baru
  db.query(
    'INSERT INTO wisata (nama_wisata, lat, lon, kelurahan, kecamatan, kab_kota, alamat, kategori) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nama_wisata, lat, lon, kelurahan, kecamatan, kab_kota, alamat, kategori],
    (error, results, fields) => {
      if (error) {
        console.error('Error adding data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      return res.status(201).json({ error: false, message: 'Data added successfully.' });
    }
  );
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  // Menghapus data wisata berdasarkan ID
  db.query('DELETE FROM wisata WHERE id_wisata = ?', id, (error, results, fields) => {
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

exports.updateData = async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;

  try {
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: true, message: 'No fields to update' });
    }

    // Memperbarui data wisata berdasarkan ID
    const result = await db.query('UPDATE wisata SET ? WHERE id_wisata = ?', [updateFields, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Data not found' });
    }

    return res.json({ error: false, message: 'Data updated successfully.' });
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

