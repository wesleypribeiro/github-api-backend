import express from "express";
import userRoutes from './src/routes/userRoutes';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`API running on port ${port}`));