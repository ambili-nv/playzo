
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { HttpStatus } from "../../../types/httpStatus";
// import configKeys from "../../../config";



// // extending the request interface to include the user object in the req
// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//       owner?:any;
//     }
//   }
// }

// const ADMIN_EMAIL = configKeys.ADMIN_EMAIL;
// const ADMIN_PASSWORD = configKeys.ADMIN_PASSWORD;

// // verify the token and validate user



// // Admin authorization to get the access to routes in admin
// export function authenticateAdmin(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");console.log("You are not authenticated");
    

//   const access_token = authHeader.split(" ")[1];
//   jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
//     if (err) {
//       res
//         .status(HttpStatus.FORBIDDEN)
//         .json({ success: false, message: "Token is not valid" });
//         console.log( "Token is not valid");
        
//     } else {
//       if (user.role === "admin") {
//         return next();
//       }
//       console.log("Your are not allowed to access this resource");
//       return res.status(HttpStatus.FORBIDDEN).json({
//         success: false,
//         message: "Your are not allowed to access this resource",
        
//         user,
//       });
//     }
//   });
// }



// // User authorization to get access to routes for users
// export function authenticateUser(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     console.log("You are not authenticated");
//     return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
//   }

//   const access_token = authHeader.split(" ")[1];
//   jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
//     if (err) {
//       console.log("Token is not valid");
//       return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
//     } else {
//       if (user.role === "user") {
//         req.user = user; // Attach user information to the request object
//         return next();
//       }
//       console.log("You are not allowed to access this resource");
//       return res.status(HttpStatus.FORBIDDEN).json({
//         success: false,
//         message: "You are not allowed to access this resource",
//         user,
//       });
//     }
//   });
// }



// // Owner authorization to get access to routes for owners
// export function authenticateOwner(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     console.log("You are not authenticated");
//     return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
//   }

//   const access_token = authHeader.split(" ")[1];
//   jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, owner: any) => {
//     if (err) {
//       console.log("Token is not valid");
//       return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
//     } else {
//       if (owner.role === "owner") {
//         req.owner = owner; // Attach user information to the request object
//         return next();
//       }
//       console.log("You are not allowed to access this resource");
//       return res.status(HttpStatus.FORBIDDEN).json({
//         success: false,
//         message: "You are not allowed to access this resource",
//         owner,
//       });
//     }
//   });
// }




// // export async function authenticateOwner(req: Request, res: Response, next: NextFunction) {
// //   try {
// //     const access_token = req.headers.authorization;
// //     if (!access_token) {
// //       console.log("No access token provided");
// //       return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
// //     }

// //     const tokenParts = access_token.split(' ');
// //     const token = tokenParts.length === 2 ? tokenParts[1] : null;

// //     if (!token) {
// //       console.log("Invalid access token format");
// //       return res.status(HttpStatus.FORBIDDEN).json("Invalid access token format");
// //     }

// //     const owner = jwt.verify(token, configKeys.ACCESS_SECRET) as JwtPayload;

// //     if (owner.role === "owner") {
// //       req.owner = owner.id;
// //       console.log("Authentication successful, proceeding to next middleware");
// //       return next();
// //     } else {
// //       console.log("User role is not 'owner'");
// //       return res.status(HttpStatus.FORBIDDEN).json({
// //         success: false,
// //         message: "You are not allowed to access this resource",
// //         owner,
// //       });
// //     }
// //   } catch (error) {
// //     console.log("Token verification failed", error);
// //     return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
// //   }
// // }



// // export async function authenticateOwner(
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) {
// //   console.log('Inside authenticateOwner middleware'); // Ensure this log is placed correctly

// //   try {
// //     // Your authentication logic
// //   } catch (error) {
// //     console.error('Error in authenticateOwner middleware:', error); // Add error logs if necessary
// //     return res.status(HttpStatus.FORBIDDEN).json({
// //       success: false,
// //       message: 'Token is not valid',
// //     });
// //   }
// // }








import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../../../types/httpStatus";
import configKeys from "../../../config";



// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
      owner?:any;
    }
  }
}

const ADMIN_EMAIL = configKeys.ADMIN_EMAIL;
const ADMIN_PASSWORD = configKeys.ADMIN_PASSWORD;

// verify the token and validate user



// Admin authorization to get the access to routes in admin
export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");console.log("You are not authenticated");
    

  const access_token = authHeader.split(" ")[1];
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
        console.log( "Token is not valid");
        
    } else {
      if (user.role === "admin") {
        return next();
      }
      console.log("Your are not allowed to access this resource");
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Your are not allowed to access this resource",
        
        user,
      });
    }
  });
}



// User authorization to get access to routes for users
export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("You are not authenticated");
    return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
  }

  const access_token = authHeader.split(" ")[1];
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      console.log("Token is not valid");
      return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
    } else {
      if (user.role === "user") {
        req.user = user; // Attach user information to the request object
        return next();
      }
      console.log("You are not allowed to access this resource");
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "You are not allowed to access this resource",
        user,
      });
    }
  });
}



// Owner authorization to get access to routes for owners
export function authenticateOwner(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("You are not authenticated");
    return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");
  }

  const access_token = authHeader.split(" ")[1];
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, owner: any) => {
    if (err) {
      console.log("Token is not valid");
      return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Token is not valid" });
    } else {
      if (owner.role === "owner") {
        req.owner = owner; // Attach user information to the request object
        return next();
      }
      console.log("You are not allowed to access this resource");
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "You are not allowed to access this resource",
        owner,
      });
    }
  });
}
