import {Document, Schema, Model, model} from "mongoose";


export interface IRefreshToken extends Document {
    refreshToken: String;
    clientId: String;
    userId: String;
    expires: Date;
}

export const RefreshTokenSchema:Schema = new Schema({
    refreshToken: {type: String, required: true, unique: true},
    clientId: String,
    userId: {type: String, required: true},
    expires: Date
});

export function saveRefreshToken(token, clientId, expires, userId, callback) {
    if (userId.id) {
        userId = userId.id;
    }

    const refreshToken = new RefreshToken({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    refreshToken.save(callback);
}


export function getRefreshToken(refreshToken, callback) {
    RefreshToken.findOne({refreshToken: refreshToken}, (err, token:any) => {
        // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
        // This is in node-oauth2-server/lib/grant.js on line 256
        if (token) {
            token.user = token.userId;
        }
        callback(err, token);
    });
}


export const RefreshToken:Model<IRefreshToken> = model<IRefreshToken>("RefreshTokens", RefreshTokenSchema);