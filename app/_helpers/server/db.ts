import mongoose from "mongoose";
const Schema = mongoose.Schema;



mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
  User: userModel(),
  Setting: settingModal(),
  Loan: loanModel(),
  gold_rate: gold_rateModal(),
};
function userModel() {
  const schema = new Schema(
    {
      fullname: { type: String },
      username: { type: String, unique: true, required: true },
      address_new: {
        line_one: { type: String },
        line_two: { type: String },
        line_three: { type: String },
        zip: { type: String },
        ds_office: { type: String },
        district: { type: String },
      },
      address_old: {
        line_one: { type: String },
        line_two: { type: String },
        line_three: { type: String },
        zip: { type: String },
        ds_office: { type: String },
        district: { type: String },
      },


      occupation: { type: String },
      nature_of_emp: { type: String },
      name_of_office: { type: String },
      income: { type: String },
      phone: { type: String },
      nic:{ type: String, unique: true},
      whatsapp: { type: String },


      hash: {
        type: String,
        required: true,
        default: "$2a$10$jo2H0i765isfINdE1xwp8OjOxjytVprZ.CDT9k2slwtbXDr81aDWq",
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      role: { type: String, default: "USER" },
      
      status:{type:String,default:"PROSPECTED"}
    },
    
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );




  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});




  return mongoose.models.User || mongoose.model("User", schema);
}
function loanModel() {
  const schema = new Schema(
    {
      estimated_price_old: { type: String },
      loan_price_old: { type: String },
      interest_old: { type: String },
      expected_price_old: { type: String },

      no_of_month: { type: String },
      
      form_number: { type: String },




      mortgage_cmp: { type: String },
      mortgage_branch: { type: String },
      mortgager_name: { type: String },
      mortgage_start_date: {
        type: Date,
        default: Date.now,
      },
      mortgage_end_date: {
        type: Date,
        default: Date.now,
      },
      mortgager_phone: { type: String },
      mortgage_interest_rate_month: { type: String },
      mortgage_interest_rate_year: { type: String },
      mortgage_invoice_number: { type: String },
      mortgage_estimate: { type: String },



      extra_payment: { type: String },
      items:[
{
        name:{type:String},
        karat:{type:String},
        total_weight:{type:String},
        net_weight:{type:String},
        pound:{type:String},
        status:{type:String,default:"NOT ISSUE"}
        
}
      ]


      ,

      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      officer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      contact_date: {
        type: Date,
        default: Date.now,
      },
      

      status:{type:String,default:"PROSPECTED"},      
      isDelete:{type:Boolean,default:false}
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );
  


  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});



  return mongoose.models.Loan || mongoose.model("Loan", schema);
}

function gold_rateModal() {
  const schema = new Schema(
    {
      company: { type: String },
      gold_rate: { type: String },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );
  return mongoose.models.Gold_rate || mongoose.model("Gold_rate", schema);
}
function todoModel() {
  const schema = new Schema(
    {
      name: { type: String },
      // gold_rate: { type: String },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );
  return mongoose.models.Gold_rate || mongoose.model("Gold_rate", schema);
}
function settingModal() {
  const schema = new Schema(
    {
      name: { type: String },
      gold_rate: { type: String },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );
  return mongoose.models.Setting || mongoose.model("Setting", schema);
}
