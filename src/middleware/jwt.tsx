import {SECRET} from '../util/CONSTANT';
import {verify} from 'jsonwebtoken';

const decodeJwt = async (req, res) => {
  const bearerToken = req.headers.authorization || '';
  const token = bearerToken.replace('Bearer', '').trim();

  if (!bearerToken || !token)
    return res.status(401).send({message: 'Your are not logged in.'});

  const {id, email, role, username, exp} = await verify(
    token,
    SECRET,
    (err, data) => {
      if (err) return {};
      return data;
    },
  );
  // eslint-disable-next-line prettier/prettier
  const currentTime = +new Date();

  if (!id || exp * 1000 < currentTime)
    return res.status(401).send({
      message:
        'Your token invalid or your session timeout. Please login again.',
    });

  return {id, email, role, username};
};

const jwtAuth = (handler) => async (req, res) => {
  req.user = await decodeJwt(req, res);
  return handler(req, res);
};

export default jwtAuth;
