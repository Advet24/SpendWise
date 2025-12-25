import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import accountRoutes from './routes/account.routes.js';
import categoryRoutes from './routes/category.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import subcategoryRoutes from './routes/subcategory.routes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/accounts' , accountRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;