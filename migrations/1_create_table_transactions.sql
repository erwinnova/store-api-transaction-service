CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT generateUUIDv4() PRIMARY KEY,
  sku VARCHAR, 
  qty INTEGER, 
  amount INTEGER
);