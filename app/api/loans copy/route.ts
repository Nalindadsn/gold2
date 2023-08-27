import joi from 'joi';

import { loansRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await loansRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await loansRepo.create(body);
}

create.schema = joi.object({
    estimated_price_old: joi.string().required(),
    loan_price_old: joi.string().required(),
    interest_old: joi.string().required(),
    expected_price_old: joi.string().required(),
});