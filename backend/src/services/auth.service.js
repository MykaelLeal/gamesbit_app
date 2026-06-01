import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const SECRET_JWT = "3eef2f39a6b1ef0ca7ee05b1328c8334a45a834f";

const loginService = (email) => 
    User.findOne({email: email}).select("+password");

const generateToken = (id) => 
    jwt.sign({id: id}, SECRET_JWT, {expiresIn: 7200});


export { loginService, generateToken };



