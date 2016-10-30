import {Document, Schema, Model, model} from "mongoose";


export interface IAuthorizationCode extends Document {
    authCode: String;
    clientId: String;
    userId: String;
    expires: Date;
}

export const AuthorizationCodeSchema:Schema = new Schema({
    authCode: {type: String, required: true, unique: true},
    clientId: String,
    userId: {type: String, required: true},
    expires: Date
});


export function getAuthCode(authCode, callback) {
    AuthorizationCode.findOne({authCode: authCode}, callback);
}

export function saveAuthCode(code, clientId, expires, userId, callback) {
    const fields = {
        clientId: clientId,
        userId: userId,
        expires: expires
    };

    AuthorizationCode.update({authCode: code}, fields, {upsert: true}, function (err) {
        if (err) {
            console.error(err);
        }

        callback(err);
    });
}

export const AuthorizationCode:Model<IAuthorizationCode > = model<IAuthorizationCode>("AuthorizationCodes", AuthorizationCodeSchema);