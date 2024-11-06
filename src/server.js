import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import router from './routes/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';


const PORT = Number(process.env.PORT) || 3000;



export const setupServer = ()=>{
const app = express();


app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
app.use(cors());

app.use(
    pinoHttp({
        transport: {
            target: 'pino-pretty',
          },
    }),
);


app.use(router);

app.use(errorHandler);

app.use(notFoundHandler);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


};





