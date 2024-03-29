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
    const body = await req.json();
    body.officer_id=cd._id

    
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

    payable_in_hand: joi.string(),
    loan_amount: joi.string(),
    monthly_installment:joi.string(),
    
    mortgage_cmp: joi.string(),

    requested_loan: joi.string(),
    first_installment: joi.string(),
    last_installment: joi.string(),
    
    mortgage_branch: joi.string().allow('').optional(),
    mortgager_name: joi.string().allow('').optional(),
    mortgage_start_date: joi.string().allow('').optional(),
    mortgage_end_date: joi.string().allow('').optional(),
    mortgager_phone: joi.string().allow('').optional(),
    mortgage_interest_rate_month: joi.string().allow('').optional(),
    mortgage_interest_rate_year: joi.string().allow('').optional(),
    mortgage_invoice_number: joi.string().allow('').optional(),
    no_of_month_expected: joi.string().allow('').optional(),

    status: joi.string(),
    no_of_month: joi.string(),
    // officer_id: joi.required(),
});