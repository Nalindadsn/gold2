// import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
// import { headers } from 'next/headers';
import { db } from "./db";
import mongoose from "mongoose";

import { headers } from 'next/headers';

const Loan = db.Loan;
const User = db.User;

export const loansRepo = {
  getAll,
  getSummary,
  getById,getByIdGuarantor,
  create,
  update,
  updateItem,
  deleteItem,
  delete: _delete,
  _deleteItem: _deleteItem,
};

async function getSummary() {
  
  const loans= await Loan.aggregate([
    
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
    $lookup: {
      from: "users",
      localField: "guarantor.user_id",
      foreignField: "_id",
      as: "guarantor"
    }
  },
    {
      $addFields: {
        id: "$_id",
      },
    },
  ]);
  const totalSales:any= await Loan.aggregate([ 

    {
    $group: {
      _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
      totalSales: { $sum: {$toDouble:'$loan_amount' } },
    },
},
{
$project: {
  _id:"$_id",
  totalSales:"$totalSales"
}
},
{
 $sort: {
   _id: 1
 }
},{
  $limit:12
}
]);
const totalSales2:any= await Loan.aggregate([ 

  {
  $group: {
    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
    totalSales: { $sum: {$toDouble:'$loan_amount' } },
  },
},
{
$project: {
_id:"$_id",
totalSales:"$totalSales"
}
},
{
$sort: {
 _id: -1
}
}
,{
  $limit:12
}
]);
const user_progress:any= await User.aggregate([
  {
    $match: {
      role:"USER"
    }

  },
  {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $count:{}  },
      },
  
},
{
  $project: {
    _id:"$_id",
    count:"$count"
  }
},
 {
   $sort: {
     _id: -1
   }
 },
 {
   $limit: 12
 }

]);
  
const up=(user_progress?.length>=2?(((user_progress[0].count))/user_progress[1].count)*100:user_progress[0]*100)
// ?user_progress[1]-user_progress[0]/user_progress[0]*100:""
const customerList= await User.find({role:"USER"}).sort({createdAt:-1}).limit(10);
const loanList= await Loan.find().sort({createdAt:-1}).limit(2);
const users= await User.find({role:"USER"}).countDocuments();
const admins= await User.find({role:"ADMIN"}).countDocuments();
const coordinators= await User.find({role:"COORDINATOR"}).countDocuments();
return {totalSales:totalSales,totalSales2:totalSales2,customers:users,admins:admins,loans:loans,customer_list:customerList,loan_list:loanList,user_progress:user_progress,user_progress_value:up,coordinators:coordinators}
}
async function getAll() {
  
  const currentUserId:any = headers().get('userId');
  console.log(currentUserId)
  const user= await User.findById(currentUserId);


if (user.role=="ADMIN") {
  
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
    $lookup: {
      from: "users",
      localField: "guarantor.user_id",
      foreignField: "_id",
      as: "guarantor"
    }
  },
    {
      $addFields: {
        id: "$_id",
      },
    },
    
{
 $sort: {
   id: -1
 }
}
  ]);
}else{

  return await Loan.aggregate([
    {
      "$match": {
        "officer_id": new mongoose.Types.ObjectId(currentUserId)
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
    $lookup: {
      from: "users",
      localField: "guarantor.user_id",
      foreignField: "_id",
      as: "guarantor"
    }
  },
    {
      $addFields: {
        id: "$_id",
      },
    },
    
{
 $sort: {
   id: -1
 }
}
  ]);
}






}

async function getByIdGuarantor(id: string) {
  try {
    const loan= await Loan.aggregate([
      {
        "$match": {
          "_id": new mongoose.Types.ObjectId(id)
        }
      },

  {
    $unwind: {
      path: "$guarantor",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "guarantor.user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $addFields: {
      "guarantor.user": {
        $cond: [
          {
            $ne: [
              "$user",
              []
            ]
          },
          {
            $arrayElemAt: [
              "$user",
              0
            ]
          },       
          "$guarantor.user",
        ]
      }
    }
  },
  {
    $group: {
      _id: "$_id",
      guarantors: {
        $push: "$guarantor"
      }
    }
  }
]);

      return loan
  } catch {
    throw "Loan Not Found";
  }

}
  async function getById(id: string) {

  try {
    const loan= await Loan.aggregate([
      {
        "$match": {
          "_id": new mongoose.Types.ObjectId(id)
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
        $lookup: {
          from: "users",
          localField: "guarantor.user_id",
          foreignField: "_id",
          as: "guarantors"
        }
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

//  console.log(params)
    const loanD= await loansRepo.getById(id);
    const data:any={
        name:params.name,
        karat:params.karat,
        net_weight: params.net_weight,
        total_weight: params.total_weight,
        pound: params.pound,
        per_pound: params.per_pound,
        status: params?.status || "ok", 
    }

    await Loan.findOneAndUpdate(
      { _id: id },
      { $push: { items: data } },
      { new: true }
    );
}
async function deleteItem(id: string, params: any) {



    await Loan.findOneAndUpdate(
      { _id: id },
      { $pull: { items: { _id: params.name  } } },
      { new: true }
    );

}

async function _delete(id: string) {
  await Loan.findByIdAndRemove(id);
}

async function _deleteItem(id: any,params:any) {
  // console.log("-api2--")
  // console.log(id,params)
  // console.log("-api-ed-")
  await Loan.findOneAndUpdate(
    { _id: "64ec7c7537b6d70c352e5124" },
    { $pull: { items: { _id: "64eccc2bf590bcb257834cc9" } } },
    { new: true }
  );
}




// db={
//   "loan": [
//     {
//       "_id": "5e9167c5303a530023bcae42",
//       guarantors: [
//         {
//           "user_id": "5e9167c5303a530023bcae42",
//           "relationship": 5,
//           "createdAt": "2020-04-12T16:08:34.966Z",
//           "updatedAt": "2020-04-12T16:08:34.966Z"
//         },
//         {
//           "user_id": "5e9167c5303a530023bcae46",
//           "relationship": 4,
//           "createdAt": "2020-04-12T16:08:34.966Z",
//           "updatedAt": "2020-04-12T16:08:34.966Z"
//         },
//         {
//           "user_id": "5e9167c5303a530023bcae45",
//           "relationship": 3,
//           "createdAt": "2020-04-12T16:08:34.966Z",
//           "updatedAt": "2020-04-12T16:08:34.966Z"
//         }
//       ]
//     }
//   ],
//   "users": [
//     {
//       "_id": "5e9167c5303a530023bcae42",
//       "name": "abc"
//     },
//     {
//       "_id": "5e9167c5303a530023bcae45",
//       "name": "def"
//     }
//   ]
// }



// db.loan.aggregate([
  
//   {
//     $unwind: {
//       path: "$guarantors",
//       preserveNullAndEmptyArrays: true
//     }
//   },
//   {
//     $lookup: {
//       from: "users",
//       localField: "guarantors.user_id",
//       foreignField: "_id",
//       as: "user_id"
//     }
//   },
//   {
//     $addFields: {
//       "guarantors.user_id": {
//         $cond: [
//           {
//             $ne: [
//               "$user_id",
//               []
//             ]
//           },
//           {
//             $arrayElemAt: [
//               "$user_id",
//               0
//             ]
//           },
//           "$guarantors.user_id"
//         ]
//       }
//     }
//   },
//   {
//     $group: {
//       _id: "$_id",
//       data: {
//         $first: "$$ROOT"
//       },
//       guarantors: {
//         $push: "$guarantors"
//       }
//     }
//   },
//   {
//     $addFields: {
//       "data.guarantors": "$guarantors"
//     }
//   },
//   {
//     $project: {
//       "data.user_id": 0
//     }
//   },
//   {
//     $replaceRoot: {
//       newRoot: "$data"
//     }
//   }
// ])


// [
//   {
//      "$match": {
//        "_id": ObjectId('6516e9d2c570be454f64d716')
//      }
//    },
//    {
//      $unwind: {
//        path: "$guarantor",
//        preserveNullAndEmptyArrays: true
//      }
//    },
//    {
//      $lookup: {
//        from: "users",
//        localField: "guarantor.user_id",
//        foreignField: "_id",
//        as: "user_id"
//      }
//    },
//    {
//      $addFields: {
//        "guarantor.user_id": {
//          $cond: [
//            {
//              $ne: [
//                "$user_id",
//                []
//              ]
//            },
//            {
//              $arrayElemAt: [
//                "$user_id",
//                0
//              ]
//            },
//            "$guarantor.user_id"
//          ]
//        }
//      }
//    },
//    {
//      $group: {
//        _id: "$_id",
//        data: {
//          $first: "$$ROOT"
//        },
//        guarantor: {
//          $push: "$guarantor"
//        }
//      }
//    },
//    {
//      $addFields: {
//        "data.guarantor": "$guarantor"
//      }
//    },
//    {
//      $project: {
//        "data.user_id": 0
//      }
//    },
//    {
//      $replaceRoot: {
//        newRoot: "$data"
//      }
//    }
//  ]