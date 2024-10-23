import Contact from '../db/models/contacts.js';

export const getAllContacts= async()=>{
    const contacts = await Contact.find();
    return contacts;
};

export const getContactsId = async(contactsId)=>{
    const contact = await Contact.findById(contactsId);
    return contact;
};