import { transactionRouter } from './router/TransactionRouter';
import { userRouter } from './router/UserRouter';
import express, { Express } from 'express';
import cors from 'cors';

export const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log('The server is running on localhost:3000');
	} else {
		console.log('Error running server');
	}
});

app.use(userRouter);
app.use(transactionRouter);
