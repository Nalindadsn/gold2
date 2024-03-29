import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from './db';
import mongoose from 'mongoose';
import { log } from 'console';

const User = db.User;
const Loan = db.Loan;

export const guarantorRepo = {
    authenticate,
    getAll,
    getAllAdmin,
    getAllCustomers,
    getById,
    getByNic,
    getCurrent,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }: { username: string, password: string }) {
    const user = await User.findOne({ username:username ,role:"ADMIN"});

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return {
        user: user.toJSON(),
        token
    };
}

async function getAll() {
    return await User.find({role:"USER"});
}

async function getAllAdmin() {
    return await User.find({role:"USER"});
}

async function getAllCustomers() {
    return await User.find();
}

async function getById(id: string) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}
async function getByNic(nic:any) {
    try {
        const my_loans=  await Loan.aggregate(
            [  
                {
                    $lookup: {
                      from: "users",
                      localField: "user_id",
                      foreignField: "_id",
                      as: "customer",
                    },
                  },
                
               {
                 $addFields: {
                  
                      "nic":  { $first: "$customer.nic" }}},
                  {
                    $match: {
                      
                      "nic":   nic
                    }
                  }
                ]
        
        )

        const my_guarantors=  await Loan.aggregate(
            [  
        {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "customer",
            },
          },
       {
         $unwind: "$guarantor"
       },
       {
         $addFields: {
           nic: { $first: "$customer.nic" }
         }
       },
       {
         $match: {
           "nic":nic
         }
       }
      ]
      )
    //   if(my_guarantors && my_loans){
        
    //   }

        const users:any = await User.aggregate(
            [  {
       
         $match: {
           "nic":nic
         
       }
    },
       {
        $addFields: {
            my_guarantors: my_guarantors,
            my_loans: my_loans,
        }
      }
 ]
      
 ).then(async(users)=>{
      return users
})
    
const array=null;


        return {users:users};

    } catch {
        throw 'User Not Found';
    }
}




async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function create(params: any) {
    // console.log(params)
    const loanExist=await Loan.findOne({ _id: params.loan_id });
    //  console.log(userExist)
    if(loanExist){
    const userExist:any=await User.findOne({ nic: params.nic });
    console.log(userExist)
    if(userExist){

        const existGuarantor = loanExist.guarantor.find((x:any) => x.user_id == (userExist._id).toString());

if(existGuarantor){

        await Loan.updateOne(
            {_id: params.loan_id,   'guarantor.user_id': (userExist._id).toString() },
            {
              $set: {
                'guarantor.$.relationship': params.relationship,
              },
            }
          );

       
    Object.assign(userExist, params);
    await userExist.save();
}else{
    const data:any={
        user_id:undefined,
        relationship:params.relationship,
    }
    data.user_id=(userExist._id).toString()
    
    loanExist.guarantor.push(data);
    await loanExist.save();

  
}

        // console.log(existGuarantor?"y":"n")




        
    }else{


        console.log("user not found")
        const data:any={
            user_id:undefined,
            relationship:params.relationship,
        }
        const user = new User(params);
        const guarantor =await user.save();
        data.user_id=guarantor._id


        
        loanExist.guarantor.push(data);
        await loanExist.save();
    

    }
    }
    // ({
    //     users: {
    //       $elemMatch: {
    //         id: "a"
    //       }
    //     }
    //   },
    //   {
    //     "users.$": 1
    //   })

// --------
//   const userExist=await User.findOne({ nic: params.nic });
//     const data:any={
//         user_id:undefined,
//         relationship:params.relationship,
//         nic:params.nic
//     }
//     if (userExist) {
// //   const gExist=await Loan.findOne({ 'guarantor.user_id': data.user_id });
//     // validate
//     if (!userExist) throw 'User not found';
//     if (userExist.username !== params.username && await User.findOne({ username: params.username })) {
//         // await Loan.findOneAndUpdate(
//         //     { _id: params.loan_id },
//         //     { $push: { guarantor: data } },
//         //     { new: true }
//         //   );
//         // throw 'Username "' + params.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (params.password) {
//         params.hash = bcrypt.hashSync(params.password, 10);
//     }

//     Object.assign(userExist, params);
//     await userExist.save();

//         data.user_id=userExist._id
//     }else{
//         const user = new User(params);
//         const guarantor =await user.save();
//         data.user_id=guarantor._id
//     }
//     await Loan.findOneAndUpdate(
//         { _id: params.loan_id },
//         { $push: { guarantor: data } },
//         { new: true }
//       );

// --------------


}

async function update(id: string, params: any) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    Object.assign(user, params);
    await user.save();
}

async function _delete(id: string,params:any) {
    await Loan.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)   },
        { $pull: { guarantor: { _id:new mongoose.Types.ObjectId(params.name)   } } },
        { new: true }
      );

}