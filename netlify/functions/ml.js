exports.handler = async (event) => {
const path = event.queryStringParameters?.path || '/sites/MLB/search?category=MLB1051&sort=sold_quantity_desc&limit=24';
const url = 'https://api.mercadolibre.com' + path;
try {
const response = await fetch(url, {
headers: {
'User-Agent': 'Mozilla/5.0 (compatible; MelhoresAchados/1.0)',
'Accept': 'application/json',
}
});
const data = await response.json();
return {
statusCode: 200,
headers: {
'Content-Type': 'application/json',
'Access-Control-Allow-Origin': '*',
'Cache-Control': 'public, max-age=120'
},
body: JSON.stringify(data)
};
} catch (err) {
return {
statusCode: 500,
headers: { 'Access-Control-Allow-Origin': '*' },
body: JSON.stringify({ error: err.message })
};
}
};
