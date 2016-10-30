import {Document, Schema, Model, model} from "mongoose";

const authorizedClientIds = ['evori'];

export interface IClient extends Document {
    clientId: String;
    clientSecret: String;
    redirectUri: String;
}

export const ClientSchema:Schema = new Schema({
    clientId: String,
    clientSecret: String,
    redirectUri: String
});


export function getClient(clientId, clientSecret, callback) {
    let params:any = {clientId};
    if (clientSecret != null) {
        params = {
            clientId,
            clientSecret
        };
    }
    Client.findOne(params, callback);
}


export function grantTypeAllowed(clientId, grantType, callback) {
    if (grantType === 'password' || grantType === 'authorization_code') {
        return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
    }

    callback(false, true);
}

export const Client:Model<IClient> = model<IClient>("Clients", ClientSchema);

