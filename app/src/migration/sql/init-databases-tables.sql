drop database if exists business;
create database business default character set utf8 collate utf8_bin;

use business;

create table `users` (
    `user_id` bigint not null auto_increment comment 'PK',
    `username` varchar(50) not null comment 'username',
    `password` varchar(50) not null comment 'password',
    `level` int not null comment 'permission level',
    `version` bigint not null comment 'user info version',
    `created_at` datetime(6) not null default current_timestamp(6) comment 'create timestamp',
    `modified_at` datetime(6) not null default current_timestamp(6) comment 'update timestamp',
    primary key (`user_id`),
    unique key `users_uk01` (`username`),
    key `users_idx01` (`username`)
);

create table `clients` (
    `client_id` bigint not null auto_increment comment 'PK',
    `client_code` varchar(50) not null comment 'client code',
    `client_name` varchar(50) not null comment 'client name',
    `client_type` varchar(50) not null comment 'client type',
    `created_at` datetime(6) not null default current_timestamp(6) comment 'create timestamp',
    `modified_at` datetime(6) not null default current_timestamp(6) comment 'update timesatmp',
    primary key (`client_id`)
);
