import express from 'express';
import pino from 'pino';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts } from './servises/contacts.js';
import { getContactsId } from './servises/contacts.js';


const PORT = Number(env('PORT','3008'));


export const setupServer = ()=>{
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




app.get('/contacts', async (req, res)=>{

try {
    const contacts =await getAllContacts();
        res.status(200).json({
            status: 200,
            data: contacts,
            message: "Successfully found contacts!",
        });
} catch (error) {
res.status(500).json({
    message:   "Internal server error",error,
});
}
});

app.get('/contacts/:contactId', async(req, res, next)=>{
try {
        const {contactId} = req.params;
    const contact = await getContactsId(contactId);
    if(!contact){
        return res.status(404).json({
            message: 'Contact not found',
        });
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
} catch (error) {
    res.status(500).json({
        message: "Internal server error",error,
    });
}
});

app.use('*', (req, res, next)=>{
    res.status(404).json({
        message: 'Non found',
    });
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


};





