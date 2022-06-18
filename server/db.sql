x   CREATE DATABASE qluaitest;


CREATE TABLE users(
    userid uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    realname VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    userpw VARCHAR(255) NOT NULL 
);

INSERT into users(username,realname,useremail,userpw)
VALUES ('hammadg','Hammad Ghaffar','hammad1@gmail.com','hello123');