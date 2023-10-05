import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { guarantorRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await guarantorRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    const data={
        line_one:body.line_one_fixed,
        line_two:body.line_two_fixed,
        line_three:body.line_three_fixed,
        zip:body.zip_fixed,
        ds_office:body.ds_office_fixed,
        district:body.district
    }
    body.address_fixed=data
    const data2={
        line_one:body.line_one_tmp,
        line_two:body.line_two_tmp,
        line_three:body.line_three_tmp,
        zip:body.zip_tmp,
        ds_office:body.ds_office_tmp,
        district:body.district
    }
    body.address_fixed=data
    body.address_tmp=data2
    await guarantorRepo.update(id, body);
}

update.schema = joi.object({
    
    relationship: joi.string(),
    fullName: joi.string(),
    gender: joi.string(),
    username: joi.string(),
    occupation: joi.string(),

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

    nature_of_emp: joi.string(),
    name_of_office: joi.string(),
    income: joi.string(),
    phone: joi.string(),
    nic: joi.string(),
    whatsapp: joi.string(),
    role: joi.string(),
    status: joi.string(),


    password: joi.string().min(6).allow(''),
});

async function _delete(req: Request, { params: { id } }: any) {
    const body = await req.json();
console.log(id)
    await guarantorRepo.delete(id,body);

 
}
