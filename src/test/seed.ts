import { models } from "mongoose";
import seeder from "mongoose-seed";
import { User } from "../model/userSchema";

const db = process.env.MONGO_URL

seeder.seed(data).then(function(dbData) {
    // The database objects are stored in dbData
}).catch(function(err) {
    // handle error
});

seeder.seed(data, function (err, dbData) {
	// ...
});


// seeder.connect(db, () => {
//   seeder.loadModels(modelPaths: [
//     './graphQLSchema'
//   ]);
//   seeder.clearModels(models, ['organizationalModel']);
//   seeder.populateModels(data, cb: function (err:Error, done:any) {
//     if (err) {
//       return console.log('seed err', err)
//     }
//     if (done) {
//       return console.log('seed done', done);

//     }
//     seeder.disconnect()
//   })

// });

const data = [{

  users: {
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
}
];