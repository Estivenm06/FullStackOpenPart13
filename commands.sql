"""CREATE TABLE BLOGS"""
CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
"""INSERT TWO BLOGS"""
INSERT INTO blogs (author, url, title) values ('Dan Abramov', 'www.test1.com', 'On let vs const');
INSERT INTO blogs (author, url, title) values ('Test2', 'www.test2.com', 'Gaps in sequences in PostgreSQL');
