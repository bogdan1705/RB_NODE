import * as repo from '../models/users.model.js';


class UsersService {
    static listUsers   = () => repo.getAll();
    static getUser     = (id) => repo.getById(id);
    static addUser     = (body) => repo.create(body);
    static updateUser   = (id, body) => repo.update(id, body);
    static deleteUser  = (id) => repo.remove(id);
}

export default UsersService;

