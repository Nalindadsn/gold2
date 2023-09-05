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
    await usersRepo.create(body);
}

create.schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    username: joi.string(),
    occupation: joi.string(),
    nature_of_emp: joi.string(),
    name_of_office: joi.string(),
    income: joi.string(),
    phone: joi.string(),
    nic: joi.string(),
    whatsapp: joi.string(),
    role: joi.string(),
    status: joi.string(),
});