CREATE DATABASE ToDoList;
USE ToDoList;
SELECT * FROM ToDoList.User;
SELECT * FROM ToDoList.Task;

DROP TABLE ToDoList.User;
DROP TABLE ToDoList.Task;

CREATE TABLE User (
	id int not null auto_increment,
    name varchar(255) not null,
    password varchar(255) not null,
    primary key(id)
);

CREATE TABLE Task (
	id int not null auto_increment,
    user_id int not null,
    content varchar(255) not null,
    is_completed int not null,
    primary key(id),
    foreign key(user_id) references User (id)
);

SELECT * FROM ToDoList.Task
WHERE user_id=2;