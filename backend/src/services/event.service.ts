import { User } from "@/models/user.model";
import { Event, IEvent } from "../models/event.model"
import { ConflictError, NotFoundError } from "@/utils/error";



export const createEvent = async (name: string, location: string, eventTime: Date, createdBy: string) => {

  const user = await User.findById(createdBy)
  if (!user) throw new ConflictError('user is not found')

  const event = new Event({ name, location, eventTime, createdBy });
  return (await event.save()).toObject();
};

export const updateEvent = async (id: string, userId: string, { name, location, eventTime }: { name?: string, location?: string, eventTime?: Date }) => {

  const event = await Event.findOne({ createdBy: userId, _id: id });
  if (!event) throw new ConflictError("This event not found this event is not created by you.");

  if (name) event.name = name;
  if (location) event.location = location;
  if (eventTime) event.eventTime = eventTime;

  return (await event.save()).toObject();

}


export const getAllEvent = async () => {
  const events = await Event.find({ isActive: true }).populate({
    path: 'createdBy',
    select: '_id name email',
    strictPopulate: false
  }).lean();
  return events
};



export const getOneEvent = async (id: string): Promise<IEvent | null> => {
  const event = await Event.findOne({ _id: id, isActive: true }).populate({
    path: 'createdBy',
    select: '_id name email',
    strictPopulate: false
  }).lean() as IEvent | null;
  if (!event) throw new NotFoundError("This Event not found")
  return event
};



export const deleteEvent = async (id: string) => {
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError("event not found")
  event.isActive = false;
  await event.save();
  return true
};