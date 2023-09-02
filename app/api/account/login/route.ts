import { cookies } from 'next/headers';
import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    POST: login
});

async function login(req: Request) {
    const body = await req.json();
    const { user, token } = await usersRepo.authenticate(body);
    cookies().set('authorization', token, { httpOnly: true });
    user.token=token ? token :null;
    user.MONGODB_URI=process.env.MONGODB_URI ? process.env.MONGODB_URI :null;
    return user;
}

login.schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});