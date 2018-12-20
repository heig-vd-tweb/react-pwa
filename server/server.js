import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import path from 'path';
import fs from 'fs';

import App from '../src/components/App/App'
import configureStore from '../src/store/configureStore';
import { loadItems } from '../src/reducers/news';

const PORT = 3000;
const app = express();

function setHeaders(res, path) {
  if (/sw.js/.test(path)) {
    res.set('Cache-Control', 'no-cache');
  }
}

app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d', index: false, setHeaders },
));


app.get('/*', (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const store = configureStore({});
    await store.dispatch(loadItems());

    const html = ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const reduxState = store.getState();

    // inject the rendered app into our html and send it
    return res.send(
      htmlData
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>
          <script>window.REDUX_STATE = ${JSON.stringify(reduxState)}; </script></body>`
        )
    );
  });
});

// start the app
app.listen(PORT, (error) => {
  console.log(`Server listening at http://localhost:${PORT}`);
});