import UsersService from "../../../services/users.service.js";

export const GET = async (req,res) => {
    const users = await UsersService.listUsers()
    res.end(JSON.stringify({count: users.length}));
}
