import { check } from 'express-validator/check';

const Validators = {
  postAuth: [
    check('login').trim(),
    check('password', 'errors.password_is_short').trim().isLength({ min: 6 }),
    check('reCaptcha'),
  ]
};

export { Validators };
