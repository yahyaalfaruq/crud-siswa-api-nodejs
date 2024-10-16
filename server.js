const http = require('http');

let siswa = [
    {id: '1', name: 'john', age: '15', class: '10'},
    {id: '2', name: 'el', age: '16', class: '11'},
    {id: '3', name: 'farq', age: '17', class: '12'},
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/siswa' && method === 'GET') {
    // Mendapatkan semua data siswa
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(siswa));
  } else if (url === '/siswa' && method === 'POST') {
    // Menambahkan siswa baru
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (body) { 
        try {
          const newSiswa = JSON.parse(body);
          newSiswa.id = (siswa.length + 1).toString(); 
          siswa.push(newSiswa);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newSiswa));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid JSON input' }));
        }
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body is empty' }));
      }
    });
  } else if (url.startsWith('/siswa/') && method === 'PUT') {
    // Memperbarui data siswa berdasarkan ID
    const id = url.split('/')[2];
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (body) {
        try {
          const updatedSiswa = JSON.parse(body);
          const index = siswa.findIndex(s => s.id === id);
          if (index !== -1) {
            siswa[index] = { id, ...updatedSiswa };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(siswa[index]));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Siswa not found' }));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid JSON input' }));
        }
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body is empty' }));
      }
    });
  } else if (url.startsWith('/siswa/') && method === 'DELETE') {
    // Menghapus siswa berdasarkan ID
    const id = url.split('/')[2]; 
    const index = siswa.findIndex(s => s.id === id);
    if (index !== -1) {
      siswa.splice(index, 1);
      res.writeHead(204); // No content
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Siswa not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
