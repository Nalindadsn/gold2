import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

register.schema = joi.object({
    fullName: joi.string().required(),
    gender: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().min(6).required(),
});