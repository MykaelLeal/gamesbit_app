import bcrypt from 'bcrypt';
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {

    try {
 
     const {email, password} = req.body;

     const user = await loginService(email);

     if (!user) {
        return res.status(404).send({message: "Usuário ou Senha não encontrado."});
     }

     const passwordIsValid = await bcrypt.compare(password, user.password);

     if(!passwordIsValid) {
        return res.status(400).send({message: "Usuário ou Senha não encontrado."});

     }

    const token = generateToken(user.id);

   res.status(200).json({
   token,
   user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      cpf: user.cpf,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
      role: user.role,
   },
   });

    } catch (err) {
      res.status(500).send({message: err.message});
    }



}

export { login };

