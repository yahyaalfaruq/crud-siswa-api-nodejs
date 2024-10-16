const http = require('http');

let students = [
    {id: '1', name: 'john', age: '15', class: '10'},
    {id: '2', name: 'el', age: '16', class: '11'},
    {id: '3', name: 'farq', age: '17', class: '12'},
]; // Array untuk menyimpan data siswa sementara

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/students' && method === 'GET') {
    // Mendapatkan semua data siswa
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
  } else if (url === '/students' && method === 'POST') {
    // Menambahkan siswa baru
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newStudent = JSON.parse(body);
      newStudent.id = students.length + 1;
      students.push(newStudent);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newStudent));
    });
  } else if (url.startsWith('/students/') && method === 'PUT') {
    // Memperbarui data siswa berdasarkan ID
    const id = parseInt(url.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedStudent = JSON.parse(body);
      const index = students.findIndex(s => s.id === id);
      if (index !== -1) {
        students[index] = { id, ...updatedStudent };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student not found' }));
      }
    });
  } else if (url.startsWith('/students/') && method === 'DELETE') {
    // Menghapus siswa berdasarkan ID
    const id = parseInt(url.split('/')[2]);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students.splice(index, 1);
      res.writeHead(204); // No content
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
