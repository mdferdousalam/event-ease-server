import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const decodeToken = (BearerToken: string) => {
   

   // Extract the token from the "Bearer" schema
   const token = BearerToken.split(" ")[1];
   console.log("token is missing");
   // Check if the token is missing
   if (!token) {
      throw new Error("Token is missing");
   }

   // Verify if the given token is valid
   const decoded = jwt.verify(
     token,
     config.jwt_access_secret as string
   ) as JwtPayload;

  const { role, userId } = decoded;
  return { userId, role };
};
