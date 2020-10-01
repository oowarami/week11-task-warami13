///import { models } from "mongoose";
const seeder = require( "mongoose-seed");
//import { User } from "../model/userSchema";
const { Org } = require("../model/orgShema.ts");
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.MONGO_URL
console.log(db);
console.log(process.env);

const data = [{

    model: "Organization",
    organization: {
      "organization": "waieresanara & co",
      "products": ["bklbk", "mb b"],
      "address": "nh;llhvjvjvjvj",
      "ceo": "cn",
      "country": "Taiwan",
      "employees": "nefnenfo"
    }
   }

];

seeder.connect(
	db,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
		useCreateIndex: true,
	},
	() => {
		seeder.loadModels(['src/model/orgShema.ts']);
		seeder.clearModels(['Organization'], function () {
			seeder.populateModels(data, () => {
				seeder.disconnect();
			});
		});
	}
);

