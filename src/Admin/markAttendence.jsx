import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [attendanceToDelete, setAttendanceToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/users", {
          params: {
            role: "member", // Ensure the API endpoint filters by role
          },
        });
        // Check if response contains the 'data' property and if it is an array
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    const fetchAttendances = async () => {
      try {
        const response = await axios.get("/api/attendance/");
        setAttendances(response.data);
      } catch (error) {
        console.error("Error fetching attendances:", error);
      }
    };

    fetchUsers();
    fetchAttendances();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
  };

  const handleAttendanceSubmit = async () => {
    // Check if the selected user has already marked attendance for the current day
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const hasMarkedAttendanceToday = attendances.some(
      (attendance) =>
        attendance.userId === selectedUserId &&
        attendance.date.split("T")[0] === today
    );

    if (hasMarkedAttendanceToday) {
      toast.error("You have already marked attendance for today");
      return;
    }

    try {
      setLoading(true);
      const date = new Date().toISOString();
      await axios.post("/api/attendance/", { userId: selectedUserId, date });
      const response = await axios.get("/api/attendance/");
      setAttendances(response.data);
      setSelectedUserId("");
      setSelectedUser(null);
      toast.success("Attendance marked successfully");
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/attendance/${attendanceToDelete._id}`);
      const response = await axios.get("/api/attendance/");
      setAttendances(response.data);
      setOpenDeleteDialog(false);
      setAttendanceToDelete(null);
      toast.success("Attendance record deleted successfully");
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast.error("Failed to delete attendance record");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (attendance) => {
    setAttendanceToDelete(attendance);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="container mx-auto px-10">
      <div className="flex flex-col h-screen">
        {/* Section 1: Mark Attendance */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b">
          <div className="md:w-1/3">
            <h2 className="text-xl font-semibold mb-2">Mark Attendance</h2>
            <select
              value={selectedUserId}
              onChange={handleUserChange}
              className="rounded-md border-gray-400 text-black border p-2 mb-2 overflow-y-auto"
              style={{ maxHeight: "10rem" }}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id} className="text-black">
                  {user.name}
                </option>
              ))}
            </select>{" "}
            <br />
            <Button
              onClick={handleAttendanceSubmit}
              disabled={loading}
              variant="contained"
              color="success"
              className={`text-white font-bold py-4 px-10 rounded ${
                loading ? "animate-pulse" : ""
              }`}
              type="button"
            >
              {loading ? "Marking..." : "Mark"}
            </Button>
          </div>

          {/* Section 2: User Preview */}
          <div className="md:w-1/3 flex items-center justify-center mt-4 md:mt-0">
            {selectedUser && (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">User Preview</h2>
                <img
                  src={`http://localhost:5000/${selectedUser.image}`}
                  alt={selectedUser.name}
                  className="w-32 h-32 object-cover rounded-s-sm"
                />
                <p className="mt-2">{selectedUser.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Attendance Records */}
        <div className="flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">All Attendance Records</h2>
          <table className="w-full text-left text-sm text-yellow-50">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="bg-red-800 text-white">
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance._id}>
                  <td className="px-6 py-4">
                    {attendance.userId?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(attendance.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {attendance.userId?.gender || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {attendance.userId?.age || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handleDeleteClick(attendance)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this attendance record? If you
              delete it, you can't get it back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="primary"
              variant="outlined"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirmation}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AttendanceManagement;
