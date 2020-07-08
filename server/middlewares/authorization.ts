import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User, UserDocument } from '../models/user.model';

export async function authorization(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token: string = req.headers['authorization'] as string;

  if (!token) {
    return res.status(401).json({code: 401, message: 'errors.authorization_failed'});
  }

  let payload: {_id: string};
  try {
    token = token.split('BEARER ')[1];
    payload = jwt.verify(token, config.secret) as {_id: string};
  } catch (e) {
    return res.status(400).json({ code: 400, message: 'errors.invalid_token' });
  }

  try {
    const user: UserDocument = await User.findById(payload._id);
    if (user) {
      req['user'] = user;
    } else {
      return res.status(401).json({code: 401, message: 'errors.authorization_failed'});
    }
  } catch (e) {
    return res.status(500).json({code: 500, message: 'errors.internal_error'});
  }

  return next();
}
