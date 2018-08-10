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
}

module.exports = {
  getTopActiveUsers: getTopActiveUsers
}
