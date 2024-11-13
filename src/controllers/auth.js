import { loginUser, registerUser } from "../servises/auth";

export const registerUserController = async (req, res)=>{

const User = await registerUser(req.params);


res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: User,
});
};

export const loginUserController= async (req, res)=>{
await loginUser(req.body);
};