const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user === null) {
        return { data: null, message: "User not found", code: 400 };
    }
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const data = { ...user.toJSON(), token };
        return { data : data, message : "Login Successfully", code : 200 };
    } else {
        return { data : null, message : "Invalid Password", code : 500 };
    }
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        return { data: null, message: 'Username "' + userParam.username + '" is already taken', code: 400 }; 
    }
    const user = new User(userParam);
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    const data = await user.save();
    return { data: data, message: 'Username successfully created', code: 200 }; 
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function update(id, userParam) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    Object.assign(user, userParam);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}