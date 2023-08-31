import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { loansRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {   
    return await loansRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    // console.log(body)
    await loansRepo.update(id, body);
}

update.schema = joi.object({
    estimated_price_old: joi.string(),
    loan_price_old: joi.string(),
    interest_old: joi.string(),
    expected_price_old: joi.string(),
    expected_month: joi.string(),
    decided_price: joi.string(),
    no_of_month: joi.string(),
    form_number: joi.string(),
    items: joi.array(),
});

async function _delete(req: Request, { params: { id } }: any) {
    await loansRepo.delete(id);

    // auto logout if deleted self
    if (id === req.headers.get('loanId')) {
        cookies().delete('authorization');
        return { deletedSelf: true };
    }
}
