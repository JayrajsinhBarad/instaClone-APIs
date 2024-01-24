const express = require('express');
const app = express();
const { UserRegister, UserRelation } = require('./models/dbModels');
const { checkUser, requireToken } = require('./middlewares/authMiddlewares');
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use(checkUser, authRoutes);
app.use(requireToken, checkUser, userRoutes);

//server listening
app.listen(5000, () => {
    console.log("Server is listening on port 5000.");
});

//model creation
UserRegister.sync().catch((error) => {
    console.log('Unable to create table: ', error);
});

UserRelation.sync().catch((error) => {
    console.log('Unable to create table: ', error);
});