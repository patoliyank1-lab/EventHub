"use client";
import { AuthContext } from "@/context/AuthContext";
import { EventContext } from "@/context/EventContext";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EVENT } from "@/api-url";
import { EventType, StoreUser } from "@/Types";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [detailEvent, setDetailEvent] = useState<EventType | null>(null);
  const { user, isLogin } = useContext(AuthContext);
  const router = useRouter();
  const { getAllEvents, deleteEvent, event, events } = useContext(EventContext);

  useEffect(() => {
    getAllEvents();
  }, [refresh]);


  const onDelete = async (ev: EventType) => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (ev.createdBy._id !== user?._id) {
      alert("You can only delete events that you created.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;
    await deleteEvent(ev._id);
    setRefresh(!refresh);
  };

  const onUpdate = (ev: EventType) => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (ev.createdBy._id !== user?._id) {
      alert("You can only edit events that you created.");
      return;
    }
    setSelectedEvent(ev);
    setIsEdit(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <span className="text-sm text-gray-500">{events?.length || 0} event{events?.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[140px]">Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((ev: EventType) => (
              <TableRow key={ev._id} onClick={() => setDetailEvent(ev)} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{ev.name}</TableCell>
                <TableCell>{ev.location}</TableCell>
                <TableCell>
                  {new Date(ev.eventTime).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(ev.eventTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${(new Date() < new Date(ev.eventTime)) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {(new Date() < new Date(ev.eventTime))  ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); onDelete(ev); }}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); onUpdate(ev); }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {detailEvent && (
        <EventDetailPopup event={detailEvent} onClose={() => setDetailEvent(null)} />
      )}
      {isEdit && (
        <>
          <UpdateEvent user={user} event={selectedEvent} setIsEdit={setIsEdit} setRefresh={setRefresh} refresh={refresh} />
        </>
      )}
    </div>
  );
}

const EventDetailPopup = ({ event, onClose }: { event: EventType; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-md p-6 w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Event Details</h2>
        <div className="mb-2"><span className="font-medium">Name: </span>{event.name}</div>
        <div className="mb-2"><span className="font-medium">Location: </span>{event.location}</div>
        <div className="mb-2"><span className="font-medium">Date: </span>{new Date(event.eventTime).toLocaleDateString()}</div>
        <div className="mb-2"><span className="font-medium">Time: </span>{new Date(event.eventTime).toLocaleTimeString()}</div>
        <div className="mb-2"><span className="font-medium">Active: </span>{event.isActive ? "Yes" : "No"}</div>
        <hr className="my-3" />
        <h3 className="text-lg font-semibold mb-2">Created By</h3>
        <div className="mb-2"><span className="font-medium">Name: </span>{event.createdBy?.name}</div>
        <div className="mb-2"><span className="font-medium">Email: </span>{event.createdBy?.email}</div>
        <Button variant="outline" className="mt-4 w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

const UpdateEvent = ({
  user,
  event,
  setIsEdit,
  setRefresh,
  refresh,
}: {
  user: StoreUser | null;
  event: EventType | null;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
}) => {
  const { updateEvent } = useContext(EventContext);
  const formik = useFormik({
    initialValues: {
      name: event?.name || "",
      datetime: event?.eventTime || "",
      location: event?.location || "",
    },
    onSubmit: async (values) => {
      if (!event || !user) return;
      await updateEvent(event._id, user._id, {
        name: values.name,
        eventTime: values.datetime,
        location: values.location,
      });
      setIsEdit(false);
      setRefresh(!refresh);
    },
  });

  const onCancel = () => {
    setIsEdit(false)
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onCancel}>
        <div className="bg-white rounded-md p-6 w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Update Event</h2>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="datetime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date &amp; Time
                </label>
                <input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  onChange={formik.handleChange}
                  value={formik.values.datetime}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Surat">Surat</option>
                </select>
              </div>
              <div className="flex gap-2 mt-5">
                <Button variant="default" type="submit">
                  Save
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
