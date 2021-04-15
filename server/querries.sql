CREATE DATABASE ToDoList;
USE ToDoList;
SELECT * FROM ToDoList.User;
TRUNCATE TABLE ToDoList.User;
DROP TABLE ToDoList.Task;
CREATE TABLE Task (
	id int not null auto_increment,
    user_id int not null,
    content varchar(255) not null,
    is_completed int not null,
    primary key(id),
    foreign key(user_id) references User (id)
);