// import { Org } from '../model/orgShema';
// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";
import  supertest from 'supertest';
import app from '../app'
// import { Org } from "../model/orgShema";
// import MyGraphQLSchema from '../model/graphQLSchema';
import { clearDatabase, closeDatabase, connect } from './mongoServer';


const request = supertest(app);

// beforeAll(async () => connect());

// /**
//  * Clear all test data after every test.
//  */
// afterEach(async () => clearDatabase());

// /**
//  * Remove and close the db and server.
//  */
// afterAll(async () => closeDatabase());

// const allOrganizations = {
//             organization: "vjvkvlv", 
//             products: ["bklbk","mb b"], 
//              marketValue: "90%", 
//              address: "nh;llhvjvjvjvj", 
//              ceo: "cn",  
//              country: "Taiwan", 
//              employees:["james bond","jackie chan"]
// }
// describe("testing for graphql query", () => {
//   test("testing for all orgs", async (done) => {
//     // const data = new Org(allOrganizations)
//     // const dataSave = data.save();
//     // console.log(dataSave);
    
//     request.post('/graphql').send({
//       query: `{
//   allOrganizations {
//     id,
//     organization,
//     address
//     employees
    
//   }
// }`,
//     }).set("Content-Type", "application/json")
//       .end((error, response) => {
//         if (error) done(error)
//         const { data } = response.body
//         // console.log('this is the info', allOrganizations);
//         console.log(response.body);
        
        
//         expect(data.allOrganizations.length).toBeGreaterThan(1)
//         done();
//       });
//   })
  
  //   test('testing for input', async (done) => {
  // 		// const data = new Org(allOrganizations)
  // 		// const dataSave = data.save();
  // 		// console.log(dataSave);
  // const random = "laju" + Math.random()
  // 		request
  // 			.post('/graphql')
  // 			.send({
  // 				query: ` mutation {
  //   addOrganization(
  //             organization: "simi1",
  //             products: ["bklbk","mb b"], 
  //             marketValue: "90%", 
  //             address: "nh;llhvjvjvjvj", 
  //             ceo: "cn",  
  //             country: "Taiwan", 
  //             employees:["james bond","jackie chan"] 
  //   ){
  //     organization,
  //     ceo
  //   }
  // }`,
  // 			})
  // 			.set('Content-Type', 'application/json')
  // 			.end((error, response) => {
  //         if (error) done(error);
  //         const { data } = response.body;
  // 				console.log('this is the info', response.body);
  //         expect(data.addOrganization.organization).toBe("simi1");
  //         // expect(1).toBe(1)
  // 				done();
  // 			});
  // 	});
  // })

  describe('testing for graphql query', () => {
		test('test should get all organizations from the datbase', (done) => {
			request
				.post('/graphql')
				.send({
					query: '{ allOrganizations{ id, organization} }',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
				

					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.allOrganizations).toBeTruthy();
          expect(res.body.data.allOrganizations.length).toBeGreaterThan(0);
					done();
				});
		});

    test('test should get one organization from the datbase', (done) => {
			request
				.post('/graphql')
				.send({
					query: '{ oneOrganization(id:"5f73a2c3b80eff2f104cad89"){id, organization}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
					console.log(res.body.data);

					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.oneOrganization).toBeTruthy();
					expect(res.body.data.oneOrganization).toHaveProperty(
						'id',
						'5f73a2c3b80eff2f104cad89'
					);
					expect(res.body.data.oneOrganization).toHaveProperty(
						'organization',
						'vjvkvlv'
					);
					done();
				});
		});
	
		test('test should sign up user to the database', (done) => {
			request
				.post('/graphql')
				.send({
					query:
						'mutation{addUser(email: "freshyo@gmail.com", username: "Warami", password: "journals"){username, email}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
					console.log(res.body.data);
          expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.addUser).toBeTruthy();
					expect(res.body.data.addUser).toHaveProperty(
						'email',
						'freshyo@gmail.com'
					);
					expect(res.body.data.addUser).toHaveProperty(
						'username',
						'Warami'
					);
          
					done();
				});
    });
    
		test('test should login user', (done) => {
			request
				.post('/graphql')
				.send({
					query:
						'mutation{login(email: "laju@gmail.com", password: "fkgnlfkn"){id, email}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
          if (err) return done(err);
          console.log(res.body.data);
          
          expect(res.body).toBeInstanceOf(Object);
          	expect(res.body.data.login).toBeTruthy();
						expect(res.body.data.login).toHaveProperty(
							'email',
							'laju@gmail.com'
						);
						expect(res.body.data.login).toHaveProperty(
							'id',
							'5f73aefce8084343961fd6f3'
						);
          
					done();
				});
		});

	
	});

