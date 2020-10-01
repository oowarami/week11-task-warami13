
import  supertest from 'supertest';
import app from '../app'
//import { clearDatabase, closeDatabase, connect } from './mongoServer';

const request = supertest(app);
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
					query:
						'{ oneOrganization(id:"5f760f95e0c015ac4c159795"){id, organization}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.oneOrganization).toBeTruthy();
					expect(res.body.data.oneOrganization).toHaveProperty(
						'id',
						'5f760f95e0c015ac4c159795'
					);
					expect(res.body.data.oneOrganization).toHaveProperty(
						'organization',
						'MTN Ghana'
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

