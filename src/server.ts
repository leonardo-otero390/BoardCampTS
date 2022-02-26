/* eslint-disable no-console */
import './setup';
import app from './app';

app.listen(4000, () => {
  console.log(`Server is listening on port 4000 at ${process.env.NODE_ENV} mode`);
});
