import http from 'http';

const postData = JSON.stringify({ amount: 50000 });

const options = {
  hostname: 'localhost',
  port: 5174,
  path: '/api/topup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Cookie': 'session=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI5NjBjMTk4YS0wNmJlLTQ0MzktOWYzNy00NzQ3MWU4YjkyNTUiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3ODgzMTQyNDksImV4cCI6MTc4ODkxOTA0OX0.oMLUhgXb5RBuah0x7m5MwWpvQCth4RX5n3g4VQ4Pn9M'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
