import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { loansRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getByIdGuarantor,
    
});

async function getByIdGuarantor(req: Request, { params: { id } }: any) {   
    return await loansRepo.getByIdGuarantor(id);
}


