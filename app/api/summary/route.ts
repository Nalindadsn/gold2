import joi from 'joi';

import { loansRepo, usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getSummary,
});

async function getSummary() {
    return await loansRepo.getSummary();
}



