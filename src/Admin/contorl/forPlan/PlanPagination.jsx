import React from "react";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PlanPaginationComponent = ({ currentPage, totalPlans, plansPerPage, paginate }) => {
  return (
    <Stack spacing={2} className="my-4">
      <Pagination
        count={Math.ceil(totalPlans / plansPerPage)}
        page={currentPage}
        onChange={(_, page) => paginate(page)} 
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon
            }}
          />
        )}
      />
    </Stack>
  );
};

export default PlanPaginationComponent;
