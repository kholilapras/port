const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Tampilkan semua project
app.get('/', (req, res) => {
  db.all('SELECT * FROM projects', (err, rows) => {
    if (err) throw err;
    res.render('index', { projects: rows });
  });
});

// Form tambah project (opsional)
app.get('/add', (req, res) => {
  res.send(`
    <form action="/add" method="POST">
      <input name="title" placeholder="Title"/><br/>
      <textarea name="description" placeholder="Description"></textarea><br/>
      <input name="link" placeholder="Link"/><br/>
      <button type="submit">Add</button>
    </form>
  `);
});

app.post('/add', (req, res) => {
  const { title, description, link } = req.body;
  db.run('INSERT INTO projects (title, description, link) VALUES (?, ?, ?)',
    [title, description, link], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
