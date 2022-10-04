import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  return res.send('Webhook for streams');
});
const global = [];
app.post('/webhook', (req, res) => {
  global.push(req.body);
  const stringifiedData = JSON.stringify(global);
  fs.writeFile('response.json', stringifiedData, { encoding: 'utf8' }, (err) => {
    if (err) {
      return res.status(400).json();
    } else {
      console.log('Request written');
    }
  });
  return res.status(200).json({ name: 'test', body: req.body });
});

app.listen(5001, () => {
  console.log('Streams webhook on 5001!');
});
