// import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
// import { headers } from 'next/headers';
import { db } from "./db";
import mongoose from "mongoose";


const Setting = db.Setting;

export const settingsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete
};


async function getAll() {
  return await Setting.find();
}


async function getById(id: string) {
  try {
     return await Setting.findById(id);
  } catch {
    throw "Loan Not Found";
  }
}

async function create(params: any) {
  // validate


  const user = new Setting(params);


  // save user
  await user.save();
}

async function update(id: string, params: any) {
  const user = await Setting.findById(id);
  // validate
  if (!user) throw 'Setting not found';

  // copy params properties to user
  Object.assign(user, params);

  await user.save();
}

async function _delete(id: string) {
  await Setting.findByIdAndRemove(id);
}