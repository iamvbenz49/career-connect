import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, unique: true },
  graduation_year: Number,
  degree: String,
  major: String,
  gpa: Number,
  skills: [String],
  interests: [String],
  career_goals: [String],
  resume_text: String,
  linkedin_url: String,
  projects: [String],
  past_internships: [String],
  preferred_industries: [String],
  location_preference: [String],
  referrals_received: { type: Number, default: 0 },
  mentorship_sessions_done: { type: Number, default: 0 },
  resume_vector_id: String,
  wallet_address: String,

  // ✅ Add this
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }],
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
