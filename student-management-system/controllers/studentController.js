const db = require('../db/config');

exports.getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
};

exports.createStudent = (req, res) => {
  const { name, age } = req.body;
  db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Student added successfully!' });
  });
};

exports.updateStudent = (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  db.query('UPDATE students SET name=?, age=? WHERE id=?', [name, age, id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Student updated successfully!' });
  });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Student deleted successfully!' });
  });
};
