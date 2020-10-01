import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import MyGraphQLSchema from "./model/graphQLSchema"
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect('mongodb+srv://organization-admin:ore-ofe13@organizations.h5yws.azure.mongodb.net/organizationDB', {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: true,
			useCreateIndex: true,
		})
		.then(() => console.log('connected to database'))
		.catch((e) =>
			console.error('cannot connect to database', e)
		);

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));


app.use(
	'/graphql',
	graphqlHTTP({
		schema: MyGraphQLSchema, 
		graphiql: process.env.NODE_ENV === 'production' ? false : true,
	})
);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req:Request, res:Response, _next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
