import express from 'express';
import cros from 'cors';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cros());
app.use(express.json()); 

app.use("/api/posts", postRoutes);

export default app;