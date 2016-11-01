import {JsonController, Get, Post as HttpPost, Param, Delete, Body, Controller} from "routing-controllers";
import {Service} from "typedi";
import {IUser, User, IUserModel} from "../model/User";
import {UserRepository} from "../repository/UserRepository";

@Service()
@JsonController()
export class UserController {

    constructor(private userRepository: UserRepository) {

    }

    @Get("/users")
    all(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    @Get("/users/:id")
    one(@Param("id") id: string): Promise<IUser> {
        return this.userRepository.findOne(id);
    }


}