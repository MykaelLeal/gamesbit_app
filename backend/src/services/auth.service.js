import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";


const loginService = (email) => 
    User.findOne({email: email}).select("+password");

const generateToken = (id) => 
    jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 7200});


export { loginService, generateToken };



