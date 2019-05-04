const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { Example } = require('react-lib-starter');
const express = require('express');

const app = express();
const port = 3000;

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>SSR Example</title>
    </head>
    <body>
      ${renderToString(createElement(Example))}
    </body>
    </html>
  `);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
