const express = require('express');
const cookieParser = require('cookie-parser');
require('express-async-errors');
require('./config/logger');
const mongoose = require('mongoose');
const morgan = require('./config/morgan');
const basePlugins = require('./plugins/base.plugin');
// const setLocale = require('./middleware/i18n.locale');
const cors = require('cors');
const errorHandler = require('./middleware/error.handler');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
// const userRouter = require('./routes/user');

mongoose.plugin(basePlugins.setToJson);
mongoose.plugin(basePlugins.constrainUnique);

const app = express();
require('./config/mongoose');

app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(setLocale);

app.use(morgan);

app.use('/', indexRouter);
app.use('/admin', adminRouter);
// app.use("/user", userRouter);

app.use(errorHandler.handler);

module.exports = app;
