// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('./utils/errors');
const NotFoundError = require('./utils/handleErrors/not-found-err');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { URL_REGEXP } = require('./utils/regexp');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;
const app = express();

app.use(cors({
  origin: [
    'https://ivanyurlov.nomoreparties.co',
    'http://ivanyurlov.nomoreparties.co',
    'http://localhost:3000'],
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
}), createUser);
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use('*', (_req, _res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errorLogger);
app.use(errors());

app.use((err, _req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR_STATUS_CODE
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаем порт ${PORT}`);
});
