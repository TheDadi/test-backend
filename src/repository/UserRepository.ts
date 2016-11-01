import {User, IUserModel} from "../model/User";
import {RepositoryBase} from "./RepositoryBase";


export class UserRepository extends RepositoryBase<IUserModel> {
    constructor() {
        super(User);
    }
}
