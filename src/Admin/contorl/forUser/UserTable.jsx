import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import NoPlanIcon from "@mui/icons-material/HighlightOff"; // Import a suitable icon for no plan

const UserTable = ({ users, onDeleteUser }) => {
  return (
    
      <div className="flex justify-center items-center min-h-1">
        <div className="overflow-x-auto">
          <table className="w-90 text-left text-sm text-black border border-red-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="bg-red-800 text-white">
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Profile Pic
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Selected Planz
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-slate-500"}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:5000/${user.image}`}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.planDetails ? user.planDetails.title : <NoPlanIcon />}
                  </td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <IconButton
                        onClick={() => onDeleteUser(user._id)}
                        color="error"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};

export default UserTable;
