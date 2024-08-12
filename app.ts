import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router'

const logger = morgan("tiny");

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(router)

const port = process.env.PORT || 80;

app.listen(port, () => console.log('Express server is running...' +　port))