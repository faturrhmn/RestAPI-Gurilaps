const db = require('../dbConnection');

exports.getAllUlasan = (req, res) => {
    db.query('SELECT ulasan.*, wisata.nama_wisat FROM ulasan JOIN wisata ON ulasan.wisata_id = wisata.id_wisata', (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        return res.json({ error: false, data: results, message: 'Data retrieved successfully.' });
    });
};

exports.getUlasanById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT u.*, w.nama_wisat AS nama_wisata FROM ulasan u INNER JOIN wisata w ON u.wisata_id = w.id_wisata WHERE u.wisata_id = ?', id, (error, results, fields) => {
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

exports.addUlasan = (req, res) => {
    const { wisata_id, deskripsi, rating, gambar } = req.body;
    db.query(
        'INSERT INTO ulasan (wisata_id, deskripsi, rating, gambar) VALUES (?, ?, ?, ?)',
        [wisata_id, deskripsi, rating, gambar],
        (error, results, fields) => {
            if (error) {
                console.error('Error adding data:', error);
                return res.status(500).json({ error: true, message: 'Internal Server Error' });
            }
            return res.status(201).json({ error: false, message: 'Data added successfully.' });
        }
    );
};

exports.deleteUlasan = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM ulasan WHERE id_ulasan = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        if (results.affectedRows > 0) { // Check if any rows were affected by the delete operation
            return res.json({ error: false, message: 'Data deleted successfully.' });
        }
        return res.status(404).json({ error: true, message: 'Data not found' });
    });
};

exports.updateUlasan = async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;

    try {
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: true, message: 'No fields to update' });
        }

        const result = await db.query('UPDATE ulasan SET ? WHERE id_ulasan = ?', [updateFields, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }

        return res.json({ error: false, message: 'Data updated successfully.' });
    } catch (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};
