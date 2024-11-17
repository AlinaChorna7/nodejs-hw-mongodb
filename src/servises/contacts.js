import { SORT_ORDER } from '../constants/index.js';
import Contact from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts= async({userId,page=1, perPage=10, sortOrder=SORT_ORDER.ASC , sortBy = 'name'})=>{
  
  const limit = perPage;
  const skip = (page -1) * perPage;

  const contactsQuery = Contact.find({userId});
  const contactsCount = await Contact.find()
  .merge(contactsQuery)
  .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return{
    data: contacts,
    ...paginationData,
  };

};

export const getContactsId = async(contactId, userId)=>{
    const contact = await Contact.findById({ _id: contactId, userId });
    return contact;
};

export const createContact =async (payload)=>{
const contact = await Contact.create(payload);
return contact;
};

export const patchContact = async (contactId, userId,payload) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId }, 
    payload,
    { new: true }
  );
    if (!updatedContact) return null;
  
    return updatedContact;
  };

  

  export const deleteContact = async (contactId, userId) => {
    const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
    return contact;
  };
  