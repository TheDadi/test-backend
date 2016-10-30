import {connect,Mongoose} from "mongoose";
import Oauth from "./oauth/Oauth";

const mongoose = connect('mongodb://localhost/evori');

export default {
    mongoose,
    Oauth
}