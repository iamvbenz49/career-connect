// models/Alumni.ts
import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, unique: true },
  graduation_year: Number,
  degree: String,
  major: String,
  current_employer: String,
  job_title: String,
  company_history: [String],
  industry: String,
  skills: [String],
  areas_of_expertise: [String],
  willing_to_mentor: { type: Boolean, default: true },
  mentor_interests: [String],
  mentorship_sessions_given: { type: Number, default: 0 },
  referrals_given: { type: Number, default: 0 },
  wallet_address: String,
}, { timestamps: true });

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
