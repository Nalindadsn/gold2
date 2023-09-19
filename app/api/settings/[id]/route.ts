import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { settingsRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    // DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {   
    return await settingsRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
        console.log(body)

 
    await settingsRepo.update(id, body);
}

update.schema = joi.object({
    company: joi.string(),
    risk_management_value: joi.string(),
    
});

// async function _delete(req: Request, { params: { id } }: any) {
//     await settingsRepo.delete(id);

//     // auto logout if deleted self

// }
