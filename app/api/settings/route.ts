import joi from 'joi';

import { settingsRepo, usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
});

async function getAll() {
    return await settingsRepo.getAll();
}

// async function create(req: Request) {
//     const cd= await usersRepo.getCurrent();

//     const body = await req.json();
//     body.officer_id=cd._id

    
//     await settingsRepo.create(body);
// }

// create.schema = joi.object({
    
    
//     // officer_id: joi.required(),
// });