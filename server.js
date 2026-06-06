const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
const parsed = url.parse(req.url, true);

if (parsed.pathname === '/ml') {
const path = parsed.query.path || '/sites/MLB/search?category=MLB1051&sort=sold_quantity_desc&limit=24';
const mlUrl = 'https://api.mercadolibre.com' + path;

https.get(mlUrl, {
headers: {
'User-Agent': 'Mozilla/5.0 (compatible; MelhoresAchados/1.0)',
'Accept': 'application/json'
}
}, (mlRes) => {
let data = '';
mlRes.on('data', chunk => data += chunk);
mlRes.on('end', () => {
res.writeHead(200, {
'Content-Type': 'application/json',
'Access-Control-Allow-Origin': '*',
'Cache-Control': 'public, max-age=120'
});
res.end(data);
});
}).on('error', (err) => {
res.writeHead(500, { 'Access-Control-Allow-Origin': '*' });
res.end(JSON.stringify({ error: err.message }));
});
} else {
res.writeHead(404);
res.end('Not found');
}
});

server.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});
