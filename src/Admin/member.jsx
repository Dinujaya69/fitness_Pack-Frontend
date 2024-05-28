import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./contorl/forUser/UserTable";
import Header from "./contorl/forUser/Header";
import AddMemberForm from "./contorl/forUser/AddMemberForm";
import DeleteUserDialog from "./contorl/forUser/DeleteUserDialog";
import PaginationComponent from "./contorl/forUser/pagination";

const UserProfile = () => {
  const [usersData, setUsersData] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/users"
        );
        const users = response.data;
        const members = users.filter((user) => user.role === "member");
        const usersWithPlans = await Promise.all(
          members.map(async (user) => {
            const planId = user.selectedPlan;

            const planResponse = await axios.get(
              `http://localhost:5000/api/plan/planid/${planId}`
            );
            const planDetails = planResponse.data;
            return { ...user, planDetails };
          })
        );
        setUsersData(usersWithPlans);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const onDeleteUser = (id) => {
    console.log(id);
    setOpenDeleteDialog(true);
    setIdToDelete(id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIdToDelete(null);
  };

  const handleDeleteConfirmation = () => {
    if (idToDelete) {
      axios
        .delete(`http://localhost:5000/api/user/${idToDelete}`)
        .then(() => {
          setUsersData((prevUsers) =>
            prevUsers.filter((user) => user.id !== idToDelete)
          );
          handleCloseDeleteDialog();
        })
        .catch((error) => console.error("Error deleting user:", error));
    } else {
      console.error("ID to delete is undefined.");
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (event, value) => setCurrentPage(value);

  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4">
        <AddMemberForm />
        <UserTable users={currentUsers} onDeleteUser={onDeleteUser} />
        <PaginationComponent
          currentPage={currentPage}
          totalUsers={usersData.length}
          usersPerPage={usersPerPage}
          paginate={paginate}
        />
      </div>
      <DeleteUserDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirmation}
      />
    </div>
  );
};

export default UserProfile;
