import { Request, Response } from "express";
import { config } from "../config/config.js";
import passport from "passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from "../modules/users/models/User.model.js";

const params = {
    secretOrKey: config.server.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('token'),
};

// Passport strategy for JWT authentication
const authMiddleware = () => {
    const strategy = new Strategy(params, (payload, done) => {
        User.findOne({
            where: { 
                id: payload.id,
                isDeleted: false 
            },
            include: "role",
            raw:true
        })
        .then(result => {
            if (result) {
                // const { role, ...userData } = result.get({ plain: true });
                let data: any = result;
                // data.role = role;
                return done(null, data);
            } else {
                return done(null, false);
            }
        })
        .catch(error => {
            console.log(error, 'errr');
            return done(error, false);
        });
    });
    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: (req: Request, res: Response, next: any) => {
            passport.authenticate("jwt", { session: false }, async (err: any, user: any) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.session = null;
                    return res.redirect('/');
                }
                if ((user.role && user.role.role !== "admin") || (user.status === "Inactive") || (user.isDeleted === true)) {
                    req.session = null;
                    return res.redirect('/');
                } else {
                    req.user = user;
                    return next();
                }
            })(req, res, next);
        },
        authenticateAPI: (req: Request, res: Response, next: any) => {
            passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
                if (err) {
                    return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
                }
                if (!user) {
                    return res.status(401).json({ auth: false, message: "There was a problem finding the user." });
                }
                if (user.status === "Inactive" || user.isDeleted === true) {
                    return res.status(403).json({ auth: false, message: "Not a valid user" });
                } else {
                    req.user = user;
                    return next();
                }
            })(req, res, next);
        },
    };
};

export default authMiddleware;