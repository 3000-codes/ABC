create database demo01;

use demo01;

drop table if exists demo_user;

create table demo_user(
    id int primary key auto_increment,
    `name` varchar(20) not null,
    age int ,
    sex char(2) default '男' check(sex in ('男','女'))
);

insert into demo_user values(null,'张三',18,'男'),
(null,'李四',19,'女'),
(null,'王五',20,'男'),
(null,'赵六',21,'女'),
(null,'田七',22,'男'),
(null,'周八',23,'女'),
(null,'吴九',24,'男'),
(null,'郑十',25,'女');

create table user(
    id string primary key,
    username varchar(20) not null,
    password varchar(20) not null
);

insert into user values('1','admin','123456');


create table books();
create table orders();
