import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import fs from 'fs';

import App from '../src/components/App/App'

const PORT = 3000;
const app = express();


app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d', index: false },
));


app.get('/*', (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const html = ReactDOM.renderToString(<App />);

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );
  });
});

// start the app
app.listen(PORT, (error) => {
  console.log(`Server listening at http://localhost:${PORT}`);
});