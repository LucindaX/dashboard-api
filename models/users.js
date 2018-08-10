const moment = require('moment');


module.exports = function(db){
  
  let module = {};

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


  return module

}
