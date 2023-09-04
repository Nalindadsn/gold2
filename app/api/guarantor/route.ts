import joi from 'joi';

import { guarantorRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await guarantorRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await guarantorRepo.create(body);
}

create.schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    nic: joi.string(),
    loan_id: joi.string(),
    password: joi.string().min(6).required(),
});