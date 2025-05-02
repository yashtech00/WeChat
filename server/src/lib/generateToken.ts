import path from "path";
import jwt from "jsonwebtoken";

export const generateToken = (userId: any, res: any) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "yash", {
    expiresIn: "24h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  console.log(token, "generated token");

  return token;
};
