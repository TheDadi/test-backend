import {Document, Schema, Model, model} from "mongoose";
import {genSaltSync} from "bcrypt";
import {hashSync} from "bcrypt";
import {compareSync} from "bcrypt";


export interface IUser {
    email: string;
    hashed_password: string;
    password_reset_token: string;
    reset_token_expires: Date;
    firstname: string;
    lastname: string;
}

export interface IUserModel extends IUser, Document {

}

export const UserSchema: Schema = new Schema({
    email: {type: String, unique: true, required: true},
    hashed_password: {type: String, required: true},
    password_reset_token: {type: String, unique: true},
    reset_token_expires: Date,
    firstname: String,
    lastname: String,
});

function hashPassword(password) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

export function register(fields, cb) {
    let user;

    fields.hashed_password = hashPassword(fields.password);
    delete fields.password;

    user = new User(fields);
    user.save(cb);
}

export function getUser(email, password, cb) {
    authenticate(email, password, (err, user) => {
        if (err || !user) return cb(err);
        cb(null, user.email);
    });
}

export function authenticate(email, password, cb) {
    this.findOne({email: email}, (err, user: IUser) => {
        if (err || !user) return cb(err);
        cb(null, compareSync(password, user.hashed_password) ? user : null);
    });
}

export const User: Model<IUserModel> = model<IUserModel>("Users", UserSchema);