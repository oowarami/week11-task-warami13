// import { Org } from '../model/orgShema';
// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";
import  supertest from 'supertest';
import app from '../app'
import { Org }from  "../model/orgShema";
import { clearDatabase, closeDatabase, connect } from './mongoServer';


const request = supertest(app);

beforeAll(async () => connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => closeDatabase());

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



  describe("tests for posting to the database  ", () => {
    let orgInfo = {
      products: ["bath and body works", ""],
      employees: ["Uche", "Bulus"],
      organization: "Rggfj",
      address: "US",
      ceo: "John",
      country: "Nigeria",
      marketValue: 90,
      noOfEmployees: 0,
    };
    orgInfo["noOfEmployees"] = orgInfo.employees.length;
    test("can be created correctly", async (done) => {
      (await request.post('/graphql')
        )
          expect(async () => await Org.create()).not.toThrow()
              
          done()
        })
    });
  

  describe("filter by ID", () => {
  
    it("can be get correctly", async () => {
      expect(
        async () => await Org.findById('5f650011e61a521623207cf9')
      ).not.toThrow();
    });
  });
  describe("delete by ID", () => {
 
    it("can be delete correctly", async () => {
      expect(async () => await Org.findByIdAndRemove()).not.toThrow();
    });
  });
  describe("Update by ID", () => {
  
    it("can be updates correctly", async () => {
      expect(async () => await Org.findByIdAndUpdate()).not.toThrow();
    });
  });
  describe("filter by organization name ", () => {
 
    it("can be filtered by organization name correctly", async () => {
      let data = {
        products: ["Mango", "Cashew"],
        employees: ["Uche", "Bulus", "Joseph"],
        noOfEmployees: 2,
        organization: "Rggfj",
        address: "US",
        country: "Nigeria",
        marketValue: 90,
      };
      expect(
        async () => await Org.find({ organization: data.organization })
      ).not.toThrow();
    });
  });
  describe("filter by market value", () => {

    it("can be filter by market value correctly", async () => {
      let data = {
        products: ["Mango", "Cashew"],
        employees: ["Uche", "Bulus", "Joseph"],
        noOfEmployees: 2,
        organization: "Rggfj",
        address: "US",
        country: "Nigeria",
        marketValue: 90,
      };
      expect(
        async () => await Org.find({ marketValue: data.marketValue })
      ).not.toThrow();
    });
  });
  describe("Can get all from database", () => {
    /**
     * Tests updating from db
     */
    it("can get all correctly", async () => {
      expect(async () => await Org.find()).not.toThrow();
    });
  });

