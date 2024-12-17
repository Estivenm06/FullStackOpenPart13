"""CREATE TABLE BLOGS"""
CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
"""INSERT TWO BLOGS"""
INSERT INTO blogs (author, url, title) values ('Test1', 'www.test1.com', 'This is test1');
INSERT INTO blogs (author, url, title) values ('Test2', 'www.test2.com', 'This is test2');
