import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./contorl/forPlan/PlanHeader";
import PlanTable from "./contorl/forPlan/PlanTable";
import PlanPaginationComponent from "./contorl/forPlan/PlanPagination";
import AddPlanForm from "./contorl/forPlan/AddPlanForm";
import EditPlanDialog from "./contorl/forPlan/EditPlanDialog";
import DeletePlanDialog from "./contorl/forPlan/DeletePlanDialog";

const PlanMain = () => {
  const [plans, setPlans] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editPlanData, setEditPlanData] = useState({
    id: "",
    title: "",
    price: "",
    description: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [plansPerPage] = useState(8);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/plan/plans");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const onAddPlan = () => {
    fetchPlans();
  };

  const onDeletePlan = (id) => {
    setOpenDeleteDialog(true);
    setIdToDelete(id);
  };

  const onEditPlan = (plan) => {
    setEditPlanData({
      id: plan._id,
      title: plan.title,
      price: plan.price,
      description: plan.description,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditPlanData({
      id: "",
      title: "",
      price: "",
      description: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
    }));
  };

  const handleSaveEditModal = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/plan/update/${editPlanData.id}`,
        editPlanData
      );
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === editPlanData.id ? editPlanData : plan
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating plan:", error);
      console.error("Request Data:", editPlanData);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (!idToDelete) {
      console.error("No ID set for deleting plan");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/plan/delete/${idToDelete}`);
      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== idToDelete)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  const paginate = (event, value) => setCurrentPage(value);

  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4">
        <AddPlanForm onAddPlan={onAddPlan} />
        <PlanTable
          plans={currentPlans}
          onEditPlan={onEditPlan}
          onDeletePlan={onDeletePlan}
        />
        <PlanPaginationComponent
          currentPage={currentPage}
          totalPlans={plans.length}
          plansPerPage={plansPerPage}
          paginate={paginate}
        />
      </div>
      <DeletePlanDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirmation}
      />
      <EditPlanDialog
        open={openEditModal}
        plan={editPlanData}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditModal}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PlanMain;
