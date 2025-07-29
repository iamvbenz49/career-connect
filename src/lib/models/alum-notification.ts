import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AlumniNotification = mongoose.models.Notification || mongoose.model('Notification', AlumniSchema);
export default AlumniNotification;
