import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await usersRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    console.log(body)
    await usersRepo.create(body);
}

create.schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    nic: joi.string(),
    password: joi.string().min(6).required(),
});