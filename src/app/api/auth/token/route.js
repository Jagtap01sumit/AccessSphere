export default function handler(request) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  if (!isValidToken(token)) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  return res.status(200).json({ message: "Token is valid" });
}

function isValidToken(token) {
  return true;
}
