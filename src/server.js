import express from 'expres';
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env';
import {GetAllStudents, GetStudentsId} from './services/students.js';

const PORT = Number(env('PORT','3008'));

export const startServer = ()=>{
const app = express();


app.use(express.json());
app.use(cors());

app.use(
    pino({
        transport: {
            target: 'pino-pretty',
          },
    }),
);

app.get('/', (req, res)=>{
   res.json({
    message: 'Hello world',
   });
});

app.use('*', (req, res, next)=>{
    res.status(404).json({
        message: 'Non found',
    });
});

app.use((err, req, res)=>{
    res.status(500).json({
        message: 'Something went wrong',
        err: err.message,
    });
});

app.get('/students',async (req, res)=>{
const students = await GetAllStudents();

res.status(200).json({
    data: students,
});
});

app.get('/students/:studentId', async (req, res, next)=>{
const studentId = req.params;
    const student = await GetStudentsId(studentId);

if(!student){
    res.status(404).json({
        message: 'Student not found',
    });
    return;
};

res.status(200).json({
    data: student,
});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


};





