import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const EditPlanDialog = ({ open, plan, onClose, onSave, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Plan</DialogTitle>
    <DialogContent>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 px-3">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={plan.title}
              onChange={onChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={plan.price}
              onChange={onChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={plan.description}
              onChange={onChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-3">
          <div className="mb-6">
            <label
              htmlFor="planImage"
              className="block text-sm font-medium text-gray-700"
            >
              Plan Image
            </label>
            {/* Displaying the current plan image */}
            {plan.planImage && (
              <img
                src={plan.planImage}
                alt="Plan Image"
                className="h-32 w-auto mb-2"
              />
            )}
            {/* Input for changing the plan image */}
            <input
              type="file"
              accept="image/*"
              name="planImage"
              id="planImage"
              onChange={onChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSave} color="secondary" autoFocus>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditPlanDialog;
