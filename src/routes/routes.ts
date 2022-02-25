import { Router } from 'express';

const routes = Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

export default routes;
