import mongoose from 'mongoose';
import Joi from 'joi';

interface OrgDocument extends mongoose.Document {
	organization: string;
	marketValue: string;
	address: string;
	ceo: string;
	country: string;
	products: [string];
	employees: [string];
	noOfEmployees: number;

}

const organizationSchema = new mongoose.Schema(
	{
		organization: {
			type: String,
			required: true,
			unique: true,
		},

		marketValue: {
			type: String,
			required: true,
    },
    
		address: {
			type: String,
			required: true,
		},

		ceo: {
			type: String,
			required: true,
    },
    
		country: {
			type: String,
			required: true,
    },
    
		products: {
			type: [String],
			required: true,
    },
    
		employees: {
			type: [String],
			required: true,
		},

		noOfEmployees: {
			type: Number,
			required: true,
		},
  },
  
	{ timestamps: true }
);

export function orgJoiValidation(details: Record<string, unknown>) {
	const schema = Joi.object({
		organization: Joi.string().min(4).max(20).required().trim(),

		marketValue: Joi.string().min(3).required(),
		address: Joi.string().min(10).max(200).required(),
		ceo: Joi.string().min(2).max(20).required(),
		country: Joi.string().required(),
		products: Joi.array().items(Joi.string()).required(),
		employees: Joi.array().items(Joi.string()).required(),
		noOfEmployees: Joi.number().min(1).required(),
	});
	return schema.validate(details, {
		abortEarly: false,
	});
}

export const Org = mongoose.model<OrgDocument>('Organization', organizationSchema);

