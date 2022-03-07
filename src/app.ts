import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import serverErrors from './middlewares/serverErrors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(serverErrors);

export default app;
