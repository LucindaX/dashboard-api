const Promise = require('bluebird');
const moment = require('moment');

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

const perPage = 2;

function getTopActiveUsers(req, res, next){
  
  var lastWeek = moment().subtract(7, 'days').format('MM-DD-YYYY');
  var page = parseInt(req.query.page) || 1;
  var offset = (page-1)*perPage;

  var query = "select users.id, users.created_at, users.name, \
              count(*), array_agg(listings.name) as listings \
              from users inner join applications \
              on users.id = applications.user_id \
              inner join listings \
              on listings.id = applications.listing_id \
              where applications.created_at >= $1 \
              group by users.id \
              order by count desc \
              limit $2 offset $3";

  db.any(query, [lastWeek.toString(), perPage, offset])
    .then( results => {
      results.forEach( item => {
        let len = item.listings.length;
        item.listings = item.listings.slice(len - 3).reverse();
      });
      res.status(200).json(results);
    })
    .catch(err => next(err))
}

module.exports = {
  getTopActiveUsers: getTopActiveUsers
}
