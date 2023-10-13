import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { loansRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    POST: addItem,
    DELETE: _deleteInstallment
});
async function update(req: Request, { params: { id } }: any) {
    
    const body = await req.json();
        const data:any={
        in_date:body.in_date,
        fines:body.fines,
        amount: body.amount
    }
    await loansRepo.deleteInstallment(id, data);
}

async function getById(req: Request, { params: { id } }: any) {   
    return await loansRepo.getById(id);
}


async function addItem(req: Request, { params: { id } }: any) {
    const loan= await loansRepo.getById(id);
    // console.log(loan)
    //  const product = await loansRepo.findById(id);
    const items = {
      name:"1",
      karat:"2",
      net_weight: "3",
      total_weight: "4",
      pound: "5",
      status: "NOT ISSUE",
    };
     loan.items.push(items);
     return await loan.save();

    // const body = await req.json();
    // await loansRepo.update(id, body);
}
async function updateItem(req: Request, { params: { id } }: any) {
    const body = await req.json();
    
    


    const loan= await loansRepo.getById(id);
    
    const items = {
      name:body.itmName,
      karat:body.karat,
      net_weight: body.net_weight,
      pound: body.pound,
      per_pound: body.per_pound,
      status: body?.status || "ok",
    };
     loan.items.push(items);
     return await loan.save();
    
    
}

updateItem.schema = joi.object({
    name: joi.string(),
    karat: joi.string(),
    net_weight: joi.string(),
    pound: joi.string().allow(''),
    per_pound: joi.string().allow(''),
});

async function _deleteInstallment(req: Request, { params: { id } }: any) {
    // await loansRepo.deleteInstallment(id,id);
    const body = await req.json();
    await loansRepo.deleteInstallment(id,body);

    // auto logout if deleted self
    // if (id === req.headers.get('loanId')) {
    //     cookies().delete('authorization');
    //     return { deletedSelf: true };
    // }
}
