// import { HttpError } from 'http-errors';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
} from 'graphql';
import { Org, orgJoiValidation } from './orgShema';
import { User, userJoiValidation } from './userSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const userModel = User;
const organizationModel = Org;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
	}),
});

const OrganizationType = new GraphQLObjectType({
	name: 'Org',
	fields: () => ({
		id: { type: GraphQLID },
		organization: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		products: { type: new GraphQLList(GraphQLString) },
		marketValue: { type: GraphQLInt },
		address: { type: GraphQLString },
		ceo: { type: GraphQLString },
		country: { type: GraphQLString },
		noOfEmployees: { type: GraphQLInt },
		employees: { type: new GraphQLList(GraphQLString) },
	}),
});



const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// GET ORGANIZATION BY ID
		oneOrganization: {
			type: OrganizationType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return organizationModel.findById(args.id);
			},
		},
		// GET ALL ORGANIZATION
		allOrganizations: {
			type: new GraphQLList(OrganizationType),
			args: {},
			resolve(parent, args) {
				return organizationModel.find();
			},
		},
		//GET ONE USER
		oneUser: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return userModel.findById(args.id);
			},
		},
		//GET ALL USERS
		allUsers: {
			type: new GraphQLList(UserType),
			args: {},
			resolve(parent, args) {
				return userModel.find();
			},
		},
	},
});



// POST MUTATION
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addOrganization: {
			type: OrganizationType,
			args: {
				organization: { type: GraphQLString },
				products: { type: new GraphQLList(GraphQLString) },
				marketValue: { type: GraphQLString },
				address: { type: GraphQLString },
				ceo: { type: GraphQLString },
				country: { type: GraphQLString },
				noOfEmployees: { type: GraphQLInt },
				employees: { type: new GraphQLList(GraphQLString) },
			},
			async resolve(parent, args) {
				try {
					args.noOfEmployees = args.employees.length;

					const { error, value } = orgJoiValidation(args);

					if (error) return error;

					let organization = await new organizationModel(value);
					return organization.save();
				} catch {
					(e: Error) => {
						console.log(e.message);
					};
				}
			},
		},

		// UPDATE
		updateOrganization: {
			type: OrganizationType,
			args: {
				id: { type: GraphQLID },
				organization: { type: GraphQLString },
				products: { type: new GraphQLList(GraphQLString) },
				marketValue: { type: GraphQLInt },
				address: { type: GraphQLString },
				ceo: { type: GraphQLString },
				country: { type: GraphQLString },
				noOfEmployees: { type: GraphQLInt },
				employees: { type: new GraphQLList(GraphQLString) },
			},
			async resolve(parent, args) {
				try {
					const { id, ...others } = args;
					others.noOfEmployees = others.employees.length;
					const result = await organizationModel.findByIdAndUpdate(id, others, {
						new: true,
					});
					return result;
				} catch {
					(e: Error) => {
						console.log(e.message);
					};
				}
			},
		},

		// DELETE
		deleteOrganization: {
			type: OrganizationType,
			args: {
				id: { type: GraphQLID },
			},
			async resolve(parent, args) {
				try {
					const { id } = args;
					// vaidata here
					const result = await organizationModel.findByIdAndRemove(id);
					// console.log(result);
					return result;
				} catch {
					(err: Error) => {
						console.log(err.message);
					};
				}
			},
		},

		addUser: {
			type: UserType,
			args: {
				username: { type: GraphQLString },
				createdAt: { type: GraphQLString },
				updatedAt: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			async resolve(parent, args) {
				const { error, value } = userJoiValidation(args);
				if (error) return error;

				const user = await new userModel(value);
				user['password'] = bcrypt.hashSync(user['password'])
					
				const saveUser = user.save();
				return saveUser;
			},
		},

		login: {
			type: UserType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				},
				async resolve (parent, args, context) {
					try {
						const { email, password} = args;
						if (!email || !password) return new Error('All fields are required!');
						return User.findOne({ email: args.email }).then((user) => {
							if (user) {
								
								if (bcrypt.compareSync(password, user['password'])) {
									
									console.log(user);
									return user;
									// const token = jwt.sign(
									// 	{
									// 		id: user.id,
									// 	},
									// 	'mySecret'
									// 	);
										// user['token'] = token;
									}
								}
							});
						} catch {
							(e: Error) => {
								console.log(e.message);
							};
						}
					},
			},
		},
	});


export default new GraphQLSchema({
	query: RootQuery, 
	mutation: Mutation, 
});
