// import { Request, Response, NextFunction } from "express";
// // import jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken";
// import { HttpStatus } from "../../../types/httpStatus";
// import configKeys from "../../../config";


// declare global {
//     namespace Express {
//       interface Request {
//         user?: {
//           id: string;
//           role: string;
//         };
//       }
//     }
//   }
  
// // Middleware to verify the token and validate user role
// export default function authenticateUser(req: Request, res: Response, next: NextFunction) {
//   const access_token = req.headers.authorization;
//   if (!access_token) {
//     return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
//   }

//   // Extract the token from the header (assuming it's in the format "Bearer <token>")
//   const tokenParts = access_token.split(' ');
//   const token = tokenParts.length === 2 ? tokenParts[1] : null;

//   if (!token) {
//     return res.status(HttpStatus.FORBIDDEN).json("Invalid access token format");
//   }

//   jwt.verify(token, configKeys.ACCESS_SECRET, (err: any, decodedToken: any) => {
//     if (err) {
//       return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
//     } else {
//       const user = decodedToken as { id: string; role: string };

//       // Check if the user's role is "user"
//       if (user.role !== 'user') {
//         return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "You do not have the required permissions" });
//       }

//     //   req.user = user.id;
//     req.user = { id: user.id, role: user.role };
//       next();
//     }
//   });
// }





import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../../../types/httpStatus";
import configKeys from "../../../config";

// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
      seller?: any;
    }
  }
}
// verify the token and validate user
export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(HttpStatus.FORBIDDEN).json("Your are not authenticated");
  }
  const access_token = authHeader.split(" ")[1];
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
    } else {
      req.user = user.id;
    }
  });
  next();
}
