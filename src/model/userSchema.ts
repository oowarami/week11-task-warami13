import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema(
	{
		email: {type:String, unique: true},
		password: String,
		username: String,

		
	},
	{ timestamps: true }
);

export function userJoiValidation(details: Record<string, unknown>) {
	const schema = Joi.object({
		username: Joi.string(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).alphanum().required(),		
	});
	return schema.validate(details, {
		abortEarly: false,
	});
}

export const User =  mongoose.model('User', userSchema);
