import 'express-session';
import { Types } from 'mongoose';
declare module 'express-session' {
    interface SessionData {
        token: string
    }
}
interface CustomUser {
    _id: any;
    first_name: string;
    email: string;
    last_name: string;
    profile_image: string;
    role: {
        _id: Types.ObjectId | string;
        role: String;
    }
    // Add any other custom properties you need
}
declare global {
    namespace Express {
        interface User extends CustomUser { }
        interface Request {
            user?: User;
        }
    }
}

