import  supertest from 'supertest';
import app from '../app';


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
						'mutation{login(email: "laju@gmail.com", password: "fkgnlfkn"){email, username}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.login).toBeTruthy();
					expect(res.body.data.login).toHaveProperty('email', 'laju@gmail.com');
					expect(res.body.data.login).toHaveProperty('username', 'Warami');
					done();
				});
		});

			test('test should update organization', (done) => {
				request
					.post('/graphql')
					.send({
						query:
							'mutation{ updateOrganization(id:"5f760f95e0c015ac4c159795", marketValue: 800){organization, marketValue}}',
					})
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body).toBeInstanceOf(Object);
						expect(res.body.data.updateOrganization).toBeTruthy();
						expect(res.body.data.updateOrganization).toHaveProperty(
							'organization',
							'MTN Ghana'
						);
						expect(res.body.data.updateOrganization).toHaveProperty(
							'marketValue',
							800
						);
						done();
					});
			});


		test('test should add a new organization', (done) => {
			request
				.post('/graphql')
				.send({
					query:
						'mutation{addOrganization(organization: "MTN Norwich", marketValue: "56%", country:"China", address:"Lagos, Nigeria", ceo:"Uchay mark", employees: ["Naomi", "Confidence"], products:["shea-butter", "oil"]){address, organization, ceo}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.addOrganization).toHaveProperty(
						'address',
						'Lagos, Nigeria'
					);
					expect(res.body.data.addOrganization).toHaveProperty(
						'organization',
						'MTN Norwich'
					);
					expect(res.body.data.addOrganization).toHaveProperty(
						'ceo',
						'Uchay mark'
					);
					done();
				});
		});

		test('test should delete organization from db', (done) => {
			request
				.post('/graphql')
				.send({
					query:
						'mutation{ deleteOrganizationByCompany(organization: "MTN Norwich"){organization}}',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) return done(err);

					expect(res.body).toBeInstanceOf(Object);
					expect(res.body.data.deleteOrganizationByCompany).toHaveProperty(
						'organization',
						'MTN Norwich'
					);
					done();
				});
		});

			test('test should delete user from db', (done) => {
				request
					.post('/graphql')
					.send({
						query: 'mutation{ deleteUser(email: "freshyo@gmail.com"){email}}',
					})
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) return done(err);

						expect(res.body).toBeInstanceOf(Object);
						expect(res.body.data.deleteUser).toHaveProperty(
							'email',
							'freshyo@gmail.com'
						);
						done();
					});
			});
				
	});

