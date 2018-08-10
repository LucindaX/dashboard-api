
insert into users (id, created_at, name) values
	(1, (now() - interval '175 days, 5 hours'), 'Alice'),
	(2, (now() - interval '154 days, 7 hours'), 'Bob'),
	(3, (now() - interval '124 days, 1 hours'), 'Carl'),
	(4, (now() - interval '101 days, 4 hours'), 'Daphne'),
	(5, (now() - interval '89 days, 6 hours'), 'Evan'),
	(6, (now() - interval '75 days, 2 hours'), 'Fabia')
;

insert into companies (id, created_at, name) values
	(1, (now() - interval '250 days'), 'Facewall'),
	(2, (now() - interval '300 days, 2 hours'), 'Company & Co')
;

insert into teams (company_id, user_id, contact_user) values
	(1, 1, TRUE),
	(2, 3, FALSE),
	(2, 4, TRUE)
;

insert into listings (id, created_at, created_by, name, description) values
	(1, (now() - interval '170 days'), 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
;

insert into applications (id, created_at, user_id, listing_id, cover_letter) values
	(1, (now() - interval '165 days'), 2, 1, 'Hello, I am Bob'),
	(2, (now() - interval '164 days'), 5, 1, 'Hello, I am Evan')
;
