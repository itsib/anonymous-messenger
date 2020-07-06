import * as express from 'express';
import { validationResult } from 'express-validator';
import fetch from 'node-fetch';
import { config } from '../../config';
import { User, UserModel } from '../../models/user.model';
import { Validators } from './auth.validators';

const authRoutes = express.Router();

/**
 * User login
 */
authRoutes.post('/login', Validators.postAuth, async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({code: 400, message: 'errors.validation_failed', errors: errors.array()});
  }

  let result: { success: boolean, 'error-codes'?: string[] };
  try {
    result = await checkReCaptcha(req.body.reCaptcha);
  } catch (e) {
    return res.status(500).json({ code: 500, message: 'errors.internal_error' });
  }

  if (!result.success) {
    return res.status(400).json({ code: 400, message: 'errors.invalid_re_captcha', errors: [{
        location: 'body',
        msg: 'errors.invalid_re_captcha',
        param: 'reCaptcha',
      }]
    });
  }


  try {
    const user: UserModel = await User.findOne({login: req.body.login});
    if (!user) {
      return res.status(400).json({code: 400, message: 'errors.invalid_password_or_login', errors: [{
          location: 'body',
          msg: 'errors.invalid_password_or_login',
          param: 'password',
        }]
      });
    }

  } catch (e) {
    console.error(e);
    return res.status(500).json({ code: 500, message: 'errors.internal_error' });
  }

});

function checkReCaptcha(key: string): Promise<{ success: boolean, 'error-codes'?: string[] }> {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCaptchaSecret}&response=${key}`;
  return fetch(url, { method: 'post' }).then(response => response.json());
}

export { authRoutes };
