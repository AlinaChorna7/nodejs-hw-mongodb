import Contact from '../db/models/contacts.js';

export const getAllContacts= async()=>{
    const contacts = await Contact.find();
    return contacts;
};

export const getContactsId = async(contactId)=>{
    const contact = await Contact.findById(contactId);
    return contact;
};

export const createContact =async (payload)=>{
const contact = await Contact.create(payload);
return contact;
};

export const patchContact = async (contactId, payload) => {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, payload, {
      new: true,
    });
  
    if (!updatedContact) return null;
  
    return updatedContact;
  };


  export const deleteContact = async (contactId) => {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
  };