import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PlanTable = ({ plans, onEditPlan, onDeletePlan }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {plans.map((plan, index) => (
          <tr key={plan.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-slate-200'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.price}</td>
            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
              {Array.isArray(plan.description) ? (
                <div className="space-y-1">
                  {plan.description.map((point, idx) => (
                    <div key={idx}>{point}</div>
                  ))}
                </div>
              ) : (
                <span>{plan.description}</span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex justify-center items-center gap-2">
                <IconButton onClick={() => onEditPlan(plan)} color="primary" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeletePlan(plan.id)} color="error" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PlanTable;
