DROP TABLE IF EXISTS users;

    CREATE TABLE users

( id  integer default nextval('users_seq_id'::regclass) not null constraint tangram_pkey primary key,
user_name text not null,
user_password text not null,
email text not null,
user_scores integer default 0,
ranking integer default 1

);

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_seq_id');