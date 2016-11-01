import {connect,Mongoose} from "mongoose";
import Oauth from "./oauth/Oauth";
import {Post} from "./Post";
import {User} from "./User";
import {Category} from "./Category";
import {Client} from "./oauth/Client"

const mongoose = connect('mongodb://localhost/evori');

export default {
    mongoose,
    Oauth,
    Post,
    User,
    Category,
    Client
}