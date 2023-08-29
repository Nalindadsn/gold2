// import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
// import { headers } from 'next/headers';
import { db } from "./db";
import mongoose from "mongoose";


const Loan = db.Loan;

export const loansRepo = {
  getAll,
  getById,
  create,
  update,
  updateItem,
  delete: _delete,
  _deleteItem: _deleteItem,
};

async function getAll() {
  return await Loan.aggregate([
    
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "officer_id",
        foreignField: "_id",
        as: "officer",
      },
    },
    {
      $addFields: {
        id: "$_id",
      },
    },
  ]);
}

async function getById(id: string) {
  try {
    // {console.log("test123")}
    const loan= await Loan.aggregate([
 
  {
    "$match": {
      "_id": new mongoose.Types.ObjectId("64ec7d7237b6d70c352e5138")
    }
  },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "officer_id",
            foreignField: "_id",
            as: "officer",
          },
        },
        {
          $addFields: {
            id: "$_id",
          },
        },
      ]);
      return loan[0]
  } catch {
    throw "Loan Not Found";
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
  if (!loan) throw "Loan not found";
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10);
  }
  // copy params properties to loan
  Object.assign(loan, params);
  await loan.save();
}
async function updateItem(id: string, params: any) {
  console.log("loans-repo");
  const loan = await Loan.findById(id);
  // validate
  if (!loan) throw "Loan not found";
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

async function _deleteItem(id: string,item_id:String) {
  await Loan.findOneAndUpdate(
    { _id: "64ec7c7537b6d70c352e5124" },
    { $pull: { items: { _id: "64eccc2bf590bcb257834cc9" } } },
    { new: true }
  );
}
