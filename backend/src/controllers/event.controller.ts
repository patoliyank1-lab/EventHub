import type { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@/utils/error";
import * as eventService from "@/services/event.service";
import { asyncHandler } from "@/utils/async-handler";

export const getAllEvent = asyncHandler(async (req: Request, res: Response) => {
  const events = await eventService.getAllEvent();

  res.status(200).json({
    success: true,
    status: 200,
    data: events,
  });
});

// create event
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    location,
    eventTime,
    createdBy,
  }: { name: string; location: string; eventTime: string; createdBy: string } = req.body;

  if (!createdBy) throw new BadRequestError("User id is not found");

  if (!name) throw new BadRequestError("name not found.");

  if (!eventTime) throw new BadRequestError("eventTime is required.");

  const date = new Date(eventTime);
  if (isNaN(date.getTime())) throw new BadRequestError("invalid date format.");

  const event = await eventService.createEvent(name, location, date, createdBy);

  res.status(201).json({
    success: true,
    status: 201,
    data: event,
  });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string | undefined;
  if (!id) throw new NotFoundError("id not found");
  const event = await eventService.deleteEvent(id);

  res.status(200).json({
    success: true,
    status: 200,
    data: event,
  });
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    userId,
    location,
    eventTime,
  }: { name: string; userId: string; location: string; eventTime: string } = req.body;
  const id = req.params.id as string | undefined;
  if (!id) throw new BadRequestError("event id is not given ");

  const event = await eventService.updateEvent(id, userId, {
    name: name,
    location: location,
    eventTime: new Date(eventTime)
  });

  res.status(200).json({
    success: true,
    status: 200,
    data: event,
  });
});

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string | undefined;
  if (!id) throw new BadRequestError("event id is not given ");

  const event = await eventService.getOneEvent(id)

  res.status(200).json({
    success: true,
    status: 200,
    data: event,
  });
});

