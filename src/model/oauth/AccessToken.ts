import {Document, Schema, Model, model} from "mongoose";


export interface IAccessTokenModel extends Document {
    accessToken: String;
    clientId: String;
    userId: String;
    expires: Date;
}

export const AccessTokenSchema:Schema = new Schema({
    accessToken: {type: String, required: true, unique: true},
    clientId: String,
    userId: {type: String, required: true},
    expires: Date
});


export function saveAccessToken(token, clientId, expires, userId, callback) {
    const fields = {
        clientId: clientId,
        userId: userId,
        expires: expires
    };

    AccessToken.update({accessToken: token}, fields, {upsert: true}, (err)=> {
        if (err) {
            console.error(err);
        }

        callback(err);
    });
}


export function getAccessToken(bearerToken, callback) {
    AccessToken.findOne({accessToken: bearerToken}, callback);
}

export const AccessToken:Model<IAccessTokenModel> = model<IAccessTokenModel>("AccessTokens", AccessTokenSchema);