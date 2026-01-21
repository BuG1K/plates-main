// pages/api/users.js
export default async function handler(req, res) {
  const response = await fetch('http://155.212.160.171:1337/users');
  const data = await response.json();
  res.status(200).json(data);
}