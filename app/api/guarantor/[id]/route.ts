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
    await guarantorRepo.update(id, body);
}

update.schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    username: joi.string(),
    occupation: joi.string(),
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

    await guarantorRepo.delete(id,body);
console.log(id)

    // auto logout if deleted self
    // if (id === req.headers.get('userId')) {
    //     cookies().delete('authorization');
    //     return { deletedSelf: true };
    // }
}
