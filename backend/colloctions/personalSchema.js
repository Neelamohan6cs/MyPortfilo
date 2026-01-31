import mongoose from "mongoose";

const personalSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },

    phone: { type: String },
    address: { type: String },
    aboutMe: { type: String },

    skills: [{ type: String }],

    experience: [
      {
        company: { type: String },
        position: { type: String },
        durationStartYearMonthDay: {
          type: Date,
          default: Date.now
        },
        durationEndYearMonthDay: {
          type: Date,
          default: Date.now
        }
      }
    ],

    education: [
  {
    college: { type: String },
    degree: { type: String },
    course: { type: String },
    from: { type: Number },
    to: { type: Number }
  }
]

    
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

const Personal = mongoose.model("Personal", personalSchema);
export default Personal;
