const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Rotem Librati',
        email: 'rotem@gmail.com',
        password: 'rotem'
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
}
const signup = (req, res, next) => {
    const { name, email, password } = req.body;
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser){
        throw new HttpError('Could not create user, email already exist.', 422);
    }
    const createUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createUser);

    res.status(201).json({ user: createUser})
}
const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not idemtify user, credentials seem to be wrong.', 401);
    } 
    res.json({ message : 'Logged in'});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
