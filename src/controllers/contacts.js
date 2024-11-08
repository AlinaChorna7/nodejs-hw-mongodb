import { getAllContacts, getContactsId, createContact, patchContact, deleteContact } from "../servises/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async(req, res)=>{
  const {page, perPage} = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
    });
    res.status(200).json({
        status: 200,
        data: {
          data: contacts.data,       
          page: contacts.page,
          perPage: contacts.perPage,
          totalItems: contacts.totalItems,
          totalPages: contacts.totalPages,
          hasPreviousPage: contacts.hasPreviousPage,
          hasNextPage: contacts.hasNextPage,
        },
        message:  "Successfully found contacts!",
    });
    };
    
    export const getContactsByIdController = async (req, res)=>{
    const {contactId} = req.params;
    const contact = await getContactsId(contactId);
    if(!contact){
      throw createHttpError(404, 'Contact not found');
    } else{
        res.status(200).json({
            status: 200,
            data: contact,
            message: `Successfully found contact with id ${contactId}!`,
        });
    }
    };


    export const createContactController = async (req, res, next) => {
        const { name, phoneNumber, contactType, email, isFavourite } = req.body;
      
     
        if (!name || !phoneNumber || !contactType) {
         throw createHttpError(400, "Required fields: name, phoneNumber, and contactType");
        }
      
        const contact = await createContact({ name, phoneNumber, contactType, email, isFavourite });
      
        res.status(201).json({
          status: 201,
          message: "Successfully created a contact!",
          data: contact,
        });
      };

export const patchContactsController = async (req, res, next )=>{
const {contactId}= req.params;
const results = await patchContact(contactId, req.body);
if(!results){
 throw createHttpError(404, 'Contact not found');
};
res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: results,
  });
};

export const deleteContactController = async(req, res, next)=>{
const {contactId} = req.params;
const contact = await deleteContact(contactId);
if(!contact){
 throw createHttpError(404, 'Contact not found');
 
};
res.status(204).send();
};