import joi from 'joi';

import { loansRepo, usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';
import { NextRequest } from 'next/server';

module.exports = apiHandler({
    GET: getByStatus,
});

async function getByStatus(req: NextRequest) {
    // const params = req.query 
    
  const url = new URL(req.url)

  const status:any = url.searchParams.get("status")

     return await loansRepo.getByStatus(status);
}
