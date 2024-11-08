import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).pattern(/^[0-9]{10,15}$/).required(),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid('personal' ,'work', 'home').required(),


});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal' ,'work', 'home'),
});
