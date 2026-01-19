import { UserService } from "./user.service";
import { Controller, Route, Get, Post, Patch, Delete, Body, Path, Tags, SuccessResponse } from "tsoa";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Route("/users")
@Tags("Users")
export class UserController extends Controller {
    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    @Post()
    @SuccessResponse("201", "Created") 
    async create (@Body() body: CreateUserDto) {
        const user = await this.userService.create(body);
        this.setStatus(201);
        return user;
    }

    /**
     * Get a specific user by ID
     * TSOA uses the @Path decorator to map the {id} in the route to the function argument.
     */
    @Get("{id}")
    async findOne (@Path() id: string) { // REMOVED: (req: Request, res: Response)
        const foundUser = await this.userService.findOne(id);
        return foundUser; // RETURN: directly return the data
    }

    @Get()
    async findAll (){
        return await this.userService.findAll();
    }

    @Patch("{id}")
    async update (@Path() id: string, @Body() body: UpdateUserDto) { // CHANGED: @Query to @Path
        return await this.userService.update(id, body);
    }

    @Delete("{id}")
    async delete (@Path() id: string) { // CHANGED: @Query to @Path
        return await this.userService.delete(id);
    }
}