import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAllAdmin,
    POST: create
});

async function getAllAdmin() {
    return await usersRepo.getAllAdmin();
}

async function create(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

create.schema = joi.object({
    fullName: joi.string(),
    gender: joi.string().allow('').optional(),
    
});