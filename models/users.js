const moment = require('moment');


module.exports = function(db){
  
  var module = {};

  var resourceLimit = null;

  module.setResourceLimit = function setResourceLimit(limit){
    resourceLimit = limit;
  }

  module.userCompanies = function userCompanies(id){
    
    var query = "select companies.id, companies.name, companies.created_at,\
                 teams.contact_user from companies inner join teams on \
                 teams.company_id = companies.id where teams.user_id = $1 \
                 limit $2";

    return db.any(query, [id, resourceLimit])
  }

  module.userListings = function userListings(id){
    
    var query = "select li.id, li.created_at, li.description, li.name \
                 from listings as li where created_by = $1 \
                 limit $2";

    return db.any(query, [id, resourceLimit])
  }

  module.userApplications = function userApplications(id){
    
    var query = "select app.id, app.created_at, app.cover_letter, \
                 li.id as listing_id, li.name as listing_name, \
                 li.description as listing_description \
                 from applications app inner join listings li \
                 on app.listing_id = li.id \
                 where app.user_id = $1 \
                 limit $2";

    return db.any(query, [id, resourceLimit])
  }

  module.topActiveUsers = function topActiveUsers(perPage, offset){
    
    var lastWeek = moment().subtract(7, 'days').format('MM-DD-YYYY');  
		
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

		return db.any(query, [lastWeek.toString(), perPage, offset])

  }

  module.user = function user(id){
    
    return db.any("select * from users where id = $1", [id])

  }


  return module

}
