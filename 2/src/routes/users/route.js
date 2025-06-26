import UsersService from "../../services/users.service.js"
import {parseBody} from "../../utils/index.js";

export const GET = async (req,res) => {
    const users = await UsersService.listUsers()
    res.end(JSON.stringify(users));
}

export const POST = async (req,res) => {
    const body = await parseBody(req);
    if(body?.name) res.writeHead(400).end(JSON.stringify({error: 'Name is required'}));

    const users = await UsersService.addUser(body);
    res.end(JSON.stringify(users));
}
