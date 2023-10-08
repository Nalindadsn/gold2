import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAllFrontOfficers,
    POST: create
});

async function getAllFrontOfficers() {
    return await usersRepo.getAllFrontOfficers();
}

async function create(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

create.schema = joi.object({
    fullName: joi.string(),
    gender: joi.string().allow('').optional(),
    username: joi.string(),
    occupation: joi.string().allow('').optional(),
    nature_of_emp: joi.string().allow('').optional(),
    name_of_office: joi.string().allow('').optional(),
    income: joi.string().allow('').optional(),
    phone: joi.string().allow('').optional(),
    nic: joi.string().allow('').optional(),
    whatsapp: joi.string().allow('').optional(),
    role: joi.string().allow('').optional(),
    status: joi.string().allow('').optional(),
});