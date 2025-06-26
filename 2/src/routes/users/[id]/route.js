import UsersService from "../../../services/users.service.js"

export const GET = async (req,res) => {
    const user = await UsersService.getUser(req.params.id)
    res.end(JSON.stringify(user));
}

export const POST = async (req,res) => {

    if(req.body?.name) res.writeHead(400).end(JSON.stringify({error: 'Name is required'}));

    const user = await UsersService.updateUser(req.params.id, req.body)
    res.end(JSON.stringify(user));
}

export const DELETE = async (req,res) => {
    const user = await UsersService.deleteUser(req.params.id)
    res.end(JSON.stringify(user));
}
