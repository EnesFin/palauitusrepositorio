CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text, 
  url text NOT NULL, 
  title text NOT NULL, 
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('blogger', 'blog.com', 'Blog', 10);

INSERT INTO blogs (author, url, title, likes) VALUES ('enes123', 'Enesmyblog.com', 'Enes My Blog', 1);
