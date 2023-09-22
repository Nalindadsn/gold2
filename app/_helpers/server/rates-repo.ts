// import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
// import { headers } from 'next/headers';
import { db } from "./db";
import mongoose from "mongoose";


const Rate = db.gold_rate;
const Setting = db.Setting;

export const ratesRepo = {
  getAll,
  getSelected,
  getById,
  create,
  update,
  _delete
};


async function getAll() {
  return await Rate.find();
}


async function getById(id: string) {
  try {
     return await Rate.findById(id);
  } catch {
    throw "Loan Not Found";
  }
}
async function getSelected() {
  try {
    
    const rmv=await Setting.findOne()
    const mktv= await Rate.findOne({selected:"YES"})
     return {rmv:rmv.risk_management_value,mkt:mktv.gold_rate,cmp_rate:mktv.gold_rate-rmv.risk_management_value};
  } catch {
    throw "Rate Not Found";
  }
}

async function create(params: any) {
  // validate


  const user = new Rate(params);


  // save user
  await user.save();
}

async function update(id: string, params: any) {
  const user = await Rate.findById(id);
  // validate
  if (!user) throw 'Rate not found';

  // copy params properties to user
  Object.assign(user, params);

  await user.save();
}

async function _delete(id: string) {
  await Rate.findByIdAndRemove(id);
}