create table department
(
	did numeric(3,0),
	dname varchar(30) not null,
	floor integer,
	head  numeric(5,0) not null,
	
	primary key (did));

create table employee
(
	eid numeric(5,0),
	ename varchar(30),
	salary float, check(salary>0),
	did numeric not null,
	classification integer ,check(classification>0),
	
	primary key (eid),
	foreign key (did) references department
	on delete cascade
	on update cascade);

create table dbudget
(
	did numeric(3,0),
	byear numeric(4,0),check(byear>1900 and byear<2100),
	budget integer,
	
	primary key (did,byear),
	foreign key (did) references department
	on update cascade
	on delete cascade);

create table project
(
	pid numeric(5,0),
	pname varchar(30),
	did numeric(3,0) not null,
	budget integer,
	ddate date ,

	primary key (pid),
	foreign key (did) references department
	on update cascade
	on delete cascade);

create table onproject
(
	pid numeric(5,0),
	eid numeric(5,0),
	fdate date,

	primary key (pid,eid),
	foreign key (pid) references project
	on delete cascade
	on update cascade,
	foreign key (eid) references employee
	on update cascade
	on delete cascade);