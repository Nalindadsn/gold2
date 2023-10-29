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
    // console.log("test")
    const body = await req.json();
    
    const data={
        line_one:body.line_one_fixed,
        line_two:body.line_two_fixed,
        line_three:body.line_three_fixed,
        zip:body.zip_fixed,
        ds_office:body.ds_office_fixed,
        district:body.district_fixed
    }
    body.address_fixed=data
    const data2={
        line_one:body.line_one_tmp,
        line_two:body.line_two_tmp,
        line_three:body.line_three_tmp,
        zip:body.zip_tmp,
        ds_office:body.ds_office_tmp,
        district:body.district_tmp
    }
    body.address_fixed=data
    body.address_tmp=data2
    const r=await usersRepo.create(body);
    console.log(r)
    return r
}

create.schema = joi.object({
    fullName: joi.string(),
    gender: joi.string().allow('').optional(),
    username: joi.string(),


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
    phone: joi.string().allow('').optional(),
    nic: joi.string().allow('').optional(),
    whatsapp: joi.string().allow('').optional(),
    role: joi.string().allow('').optional(),
    status: joi.string().allow('').optional(),
});