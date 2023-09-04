import joi from 'joi';

import { loansRepo, usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await loansRepo.getAll();
}

async function create(req: Request) {
    const cd= await usersRepo.getCurrent();
    // console.log(cd)

    const body = await req.json();
    body.officer_id=cd._id

    // console.log(body)
    
    await loansRepo.create(body);
}

create.schema = joi.object({
    estimated_price_old: joi.string().required(),
    loan_price_old: joi.string().required(),
    interest_old: joi.string().required(),
    expected_price_old: joi.string().required(),
    user_id: joi.required(),
    items:joi.array(),
    form_number:joi.string(),
    
    mortgage_cmp: joi.string(),
    decided_price: joi.string(),
    no_of_month: joi.string(),
    // officer_id: joi.required(),
});