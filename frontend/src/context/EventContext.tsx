"use client";
import { AUTH, EVENT } from "@/api-url";
import { EventType, ResponseType, StoreUser } from "@/Types";
import { createContext, useCallback, useEffect, useState } from "react";

const defaultValue: {
  events: EventType[] | null;
  event: EventType | null;
  isLoading: boolean;
  isError: boolean | null;
  massage: string | null;
  getAllEvents: () => void;
  createEvent: ({
    name,
    eventTime,
    createdBy,
    location,
  }: {
    name: string;
    eventTime: string;
    createdBy: string;
    location: string;
  }) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (
    id: string,
    userId: string,
    {
      name,
      location,
      eventTime,
    }: { name: string; location: string; eventTime: string },
  ) => void;
} = {
  events: null,
  event: null,
  isLoading: true,
  isError: null,
  massage: null,
  getAllEvents: () => {},
  createEvent: ({
    name,
    eventTime,
    createdBy,
    location,
  }: {
    name: string;
    eventTime: string;
    createdBy: string;
    location: string;
  }) => {},
  deleteEvent: (id: string) => {},
  updateEvent: (
    id: string,
    userId: string,
    {
      name,
      location,
      eventTime,
    }: { name: string; location: string; eventTime: string },
  ) => {},
};

export const EventContext = createContext(defaultValue);

export default function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setisLoading] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [massage, setMassage] = useState<string | null>(null);

  const getAllEvents = async () => {
    try {
      setisLoading(true);
      const response = await fetch(EVENT.EVENT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ResponseType = await response.json();

      if (response.ok) {
        setisLoading(false);
        setIsError(false);
        setEvents(result.data as EventType[]);
      } else {
        setisLoading(false);
        setIsError(true);
        setMassage(result.message || "failed to get event");
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setIsError(true);
    }
  };

  const createEvent = async ({
    name,
    eventTime,
    createdBy,
    location,
  }: {
    name: string;
    eventTime: string;
    createdBy: string;
    location: string;
  }) => {
    try {
      const response = await fetch(EVENT.EVENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, eventTime, createdBy, location }),
      });

      const result: ResponseType = await response.json();

      if (result.success) {
        setisLoading(false);
        setIsError(false);
        getAllEvents();
      } else {
        setisLoading(false);
        setIsError(true);
        setMassage(result.message || "failed create event");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(EVENT.EVENT_BY_ID(id), {
        method: "DELETE",
      });

      const result: ResponseType = await response.json();
      if (result.success) {
        setisLoading(false);
        setIsError(false);
        getAllEvents();
      } else {
        setisLoading(false);
        setIsError(true);
        setMassage(result.message || "failed to delete.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async (
    id: string,
    userId: string,
    {
      name,
      location,
      eventTime,
    }: { name: string; location: string; eventTime: string },
  ) => {
    try {
      const response = await fetch(EVENT.EVENT_BY_ID(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, eventTime, userId }),
      });

      const result: ResponseType = await response.json();
      if (result.success) {
        setisLoading(false);
        setIsError(false);
        getAllEvents();
      } else {
        setisLoading(false);
        setIsError(true);
        setMassage(result.message || "failed to delete.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <EventContext.Provider
      value={{
        event,
        events,
        isError,
        massage,
        isLoading,
        createEvent,
        deleteEvent,
        getAllEvents,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
