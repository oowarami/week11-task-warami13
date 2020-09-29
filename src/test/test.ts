import supertest from "supertest";

import app from "../app";
import { Response } from "express";

const request = supertest(app);

describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post(
        "/graphql?query=%7B%0A%20%20getAllOrganization%7B%0A%20%20%20%20ceo%0A%20%20%7D%0A%7D%0A%23%20mutation%7B%0A%23%20%20%20userLogin(%0A%23%20%20%20%20%20username%3A%22James%22%2C%0A%23%20%20%20%20%20password%3A%22laaaa%22%0A%23%20%20%20)%7B%0A%23%20%20%20%20%20username%0A%23%20%20%20%7D%0A%23%20%7D%0A%0A%23%20mutation%7B%0A%23%20%20%20addUser(%0A%23%20%20%20%20%20username%3A%22James%22%2C%0A%23%20%20%20%20%20password%3A%22laaaa%22%0A%23%20%20%20)%7B%0A%23%20%20%20%20%20username%0A%23%20%20%20%7D%0A%23%20%7D%0A%0A%23%20mutation%7B%0A%23%20%20%20%20addUser(%0A%23%20%20%20%20%20username%3A%22Decason%22%2C%0A%23%20%20%20%20%20%20password%3A%22laaaa%22%0A%23%20%20%20%20)%7B%0A%23%20%20%20%20%20username%0A%23%20%20%20%20%7D%0A%23%20%20%7D%0A%0A%23%20%7B%0A%23%20%20%20getAllOrganization%7B%0A%23%20%20%20%20%20organization%0A%23%20%20%20%20%20noOfEmployees%0A%23%20%20%20%20%20employees%0A%23%20%20%20%20%20id%0A%23%20%20%20%7D%0A%23%20%7D%0A%0A%23%20mutation%7B%0A%23%20%20%20%20%20updateOrganization(%0A%23%20%20%20%20%20id%3A%225f605d016e106a9618e4dcaa%22%2C%0A%23%20%20%20%20%20employees%3A%20%5B%22james%20bond%22%2C%22Peter%22%2C%22Lawrence%22%2C%22Jacob%22%2C%22Joy%22%2C%22Isaac%22%5D%2C%0A%23%20%20%20%20%20)%7B%0A%23%20%20%20%20%20organization%0A%23%20%20%20%20%20id%0A%23%20%20%20%20%20country%0A%23%20%20%20%20%20employees%0A%23%20%20%20%7D%0A%23%20%7D%0A%0A%0A%0A%0A%23%20%7B%0A%23%20%20%20getOneOrganization(id%3A%225f605d016e106a9618e4dcaa%22)%7B%0A%23%20%20%20%20%20organization%2C%0A%23%20%20%20%20%20employees%0A%23%20%20%20%20%20noOfEmployees%0A%23%20%20%20%7D%0A%23%20%7D%0A%23%20mutation%7B%0A%23%20%20%20deleteOrganization(id%3A%225f605d016e106a9618e4dcaa%22)%7B%0A%23%20%20%20%20%20organization%0A%23%20%20%20%7D%0A%23%20%7D%0A%0A%23%20mutation%7B%0A%23%20%20%20addOrganization(%0A%20%20%20%20%0A%23%20%20%20%20%20organization%3A%20%22Decason%22%2C%0A%23%20%20%20%20%20products%3A%20%5B%22developers%22%5D%2C%0A%23%20%20%20%20%20marketValue%3A%2090%2C%0A%23%20%20%20%20%20address%3A%20%22sangotedo%22%2C%0A%23%20%20%20%20%20ceo%3A%20%22cn%22%2C%0A%23%20%20%20%20%20country%3A%20%22Taiwan%22%2C%0A%23%20%20%20%20%20noOfEmployees%3A%202%2C%0A%23%20%20%20%20%20employees%3A%20%5B%22james%20bond%22%2C%22Peter%22%5D%2C%0A%23%20%20%20%20%20)%7B%0A%23%20%20%20%20%20organization%0A%23%20%20%20%20%20id%0A%23%20%20%20%7D%0A%23%20%7D"
      )
      .then((res) => {
        console.log(res);
        expect(res.status).toBe(200);
        done();
      });
  });
});
