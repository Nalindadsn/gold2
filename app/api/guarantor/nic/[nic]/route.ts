import joi from 'joi';

import { guarantorRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';
import { NextApiRequest } from 'next';

module.exports = apiHandler({
    GET: getByNic,
    POST: create
});

async function getByNic(req:Request,{ params: { nic } }: any) {
    // console.log(nic)
    return await guarantorRepo.getByNic(nic);
}

async function create(req: Request) {
    const body = await req.json();
    
    await guarantorRepo.create(body);
}

create.schema = joi.object({

    relationship: joi.string(),
    fullName: joi.string(),
    gender: joi.string().allow('').optional(),
    username: joi.string().allow('').optional(),
    occupation: joi.string().allow('').optional(),

    line_one_fixed: joi.string().allow('').optional(),
    line_two_fixed: joi.string().allow('').optional(),
    line_three_fixed: joi.string().allow('').optional(),
    zip_fixed: joi.string().allow('').optional(),
    ds_office_fixed: joi.string().allow('').optional(),
    district_fixed: joi.string().allow('').optional(),

    line_one_tmp: joi.string().allow('').optional(),
    line_two_tmp: joi.string().allow('').optional(),
    line_three_tmp: joi.string().allow('').optional(),
    zip_tmp: joi.string().allow('').optional(),
    ds_office_tmp: joi.string().allow('').optional(),
    district_tmp: joi.string().allow('').optional(),

    nature_of_emp: joi.string().allow('').optional(),
    name_of_office: joi.string().allow('').optional(),
    income: joi.string().allow('').optional(),
    loan_id: joi.string(),
    phone: joi.string().allow('').optional(),
    nic: joi.string().allow('').optional(),
    whatsapp: joi.string().allow('').optional(),
    role: joi.string().allow('').optional(),
    status: joi.string().allow('').optional(),
});