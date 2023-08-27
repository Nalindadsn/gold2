// import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { headers } from 'next/headers';
import { db } from './db';

const Loan = db.Loan;

export const loansRepo = {
    getAll,
    getById,
    create,
    update,
    updateItem,
    delete: _delete
};



async function getAll() {
    return await Loan.find();
}

async function getById(id: string) {
    try {
        // {console.log("test123")}
        return await Loan.findById(id);
    } catch {
        throw 'Loan Not Found';
    }
}


async function create(params: any) {
    // validate
    // if (await Loan.findOne({ loanname: params.loanname })) {
    //     throw 'Loanname "' + params.loanname + '" is already taken';
    // }

    const loan = new Loan(params);

    // hash password
    if (params.password) {
        loan.hash = bcrypt.hashSync(params.password, 10);
    }

    // save loan
    await loan.save();
}

async function update(id: string, params: any) {
    const loan = await Loan.findById(id);
    // validate
    if (!loan) throw 'Loan not found';
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }
    // copy params properties to loan
    Object.assign(loan, params);
    // await loan.save();
    await getById(id)
}
async function updateItem(id: string, params: any) {
    const loan = await Loan.findById(id);
    // validate
    if (!loan) throw 'Loan not found';
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }
    // copy params properties to loan
    Object.assign(loan, params);
    await loan.save();
}

async function _delete(id: string) {
    await Loan.findByIdAndRemove(id);
}


