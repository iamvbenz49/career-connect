// models/Job.ts
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  job_id: { type: String, required: true, unique: true },
  title: String,
  company: String,
  description: String,
  required_skills: [String],
  industry: String,
  posted_by: { type: String, ref: 'Alumni' }, // alumni user_id
  applicants: [{ type: String, ref: 'Student' }],
  referral_status: {
    type: String,
    enum: ['open', 'referred', 'closed'],
    default: 'open'
  },
  referral_hash_on_chain: String, // Optional blockchain usage
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
