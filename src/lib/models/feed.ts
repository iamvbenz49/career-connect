import mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema({
  title: String,
  description: String,
  timestamp: String,
}, { timestamps: true });

export const Feed = mongoose.models.Feed || mongoose.model('feed', FeedSchema);
