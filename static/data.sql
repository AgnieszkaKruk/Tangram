drop table if exists users;

create table users
(
    id            bigserial primary key,
    user_name     text    not null unique,
    user_password text    not null,
    email         text    not null unique,
    user_scores   integer not null default 0,
    ranking       integer not null default 1
);
