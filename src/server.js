const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 7600;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8'));
  } else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'HEALTHY', app: 'CognitiveMatrix-AI', agents: 16, matrixNodes: 256, uptime: process.uptime() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => console.log('CognitiveMatrix-AI Server active on port ' + PORT));
