CREATE TABLE IF NOT EXISTS files(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    ref VARCHAR(32),
    link VARCHAR(255)
);

