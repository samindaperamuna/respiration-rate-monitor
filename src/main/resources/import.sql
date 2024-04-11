-- Insert default user with username 'user' and password 'user123'
insert into user_info (id, username, password) values (1,'user','$2a$12$GpnZh8LwPnvSusn9dlYZPu/o3BB8pHQ45jhI5uu/UE.zJi7JELe6q');

insert into role (id, name) values ( 1, 'USER');

insert into user_info_roles (roles_id, user_info_id) values ( 1, 1);