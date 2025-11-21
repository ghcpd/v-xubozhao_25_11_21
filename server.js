import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.use(express.static(publicDir, { extensions: ['html'] }));

app.use((_, res) => {
  res.status(404).sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`UI server running on http://localhost:${PORT}`);
});
