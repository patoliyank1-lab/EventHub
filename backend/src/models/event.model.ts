import mongoose, { Schema } from "mongoose";


export interface IEvent {
  name: string;
  location: string;
  eventTime: Date;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    eventTime: {
      type: Date,
      required: [true, "Event time is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
    location: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: true }, // This will add createdAt and updatedAt fields
);


export const Event = mongoose.model<IEvent>("Event", eventSchema);
