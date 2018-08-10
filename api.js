const Promise = require('bluebird');

const options = {
  promiseLib: Promise
}

const pgp = require('pg-promise')(options);
const conn = {
  host: 'localhost',
  port: 5432,
  database: 'dashboard-api',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const db = pgp(conn);

const users = require('./models/users')(db); 

const perPage = 2;

const userResourcesLimit = 5;

function getTopActiveUsers(req, res, next){
  
  var page = parseInt(req.query.page) || 1;
  var offset = (page-1)*perPage;

  users.topActiveUsers(perPage, offset).then( results => {
    results.forEach( item => {
      let len = item.listings.length;
      item.listings = item.listings.slice(len - 3).reverse();
    });
    res.status(200).json(results);
  })
  .catch(err => next(err))
}

function getUser(req, res, next){
  
  var id = req.query.id;
    
  if(!id) return res.status(422).send("No user id provided");

  users.user(id)
    .then( user => {

      if (!user.length) return res.status(404).send("user not found");

      users.setResourceLimit(userResourcesLimit);
      
      resources = [users.userCompanies(id), users.userListings(id), users.userApplications(id)];
      
      Promise.all(resources).then( values => {
        
        user.companies = values[0];
        user.createdListings = values[1];

        var applications = values[2];
        
        applications.forEach( application => {
          
          listing = {
            id: application.listing_id,
            name: application.listing_name,
            description: application.listing_description
          };

          ['listing_id','listing_name','listing_description'].forEach( attr => delete application[attr] );
          
          application.listing = listing;

        });
        
        user.applications = applications;
          
        return res.status(200).json(user);

      })
    })
    .catch( err => next(err))
}

module.exports = {
  getTopActiveUsers: getTopActiveUsers,
  getUser: getUser
}
