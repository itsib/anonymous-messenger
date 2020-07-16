import { check } from 'express-validator';

const Validators = {
  postAuth: [
    check('login').trim().exists(),
    check('password', 'errors.password_is_short').trim().exists().isLength({ min: 6 }),
    check('reCaptcha').exists(),
  ],
  updateUser: []
};

export { Validators };
