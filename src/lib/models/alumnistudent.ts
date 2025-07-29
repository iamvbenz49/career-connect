// 1️⃣ /lib/models/alumnistudent.js
import mongoose from 'mongoose';

const AlumniStudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  graduation_year: Number,
  degree: String,
  major: String,
  skills: [String],
  tech_rating: Number,
  behavior_rating: Number,
  referrals: [
    {
      alumni_name: String,
      status: { type: String, enum: ['Pending', 'Rejected', 'Selected'] },
      date: Date,
    },
  ],
}, { timestamps: true });

export default mongoose.models.AlumniStudent || mongoose.model('AlumniStudent', AlumniStudentSchema);