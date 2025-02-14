import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;

//   const user = await User.findOne({
//     where: { username },
//   });
//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '7d' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/signUp', signUp);

export default router;