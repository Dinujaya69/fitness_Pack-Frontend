import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PaginationComponent = ({
  currentPage,
  totalUsers,
  usersPerPage,
  paginate,
}) => {
  return (
    <Stack spacing={2} className="my-4">
      <Pagination
        count={Math.ceil(totalUsers / usersPerPage)}
        page={currentPage}
        onChange={paginate}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            icons={{
              previous: <ArrowBackIcon />,
              next: <ArrowForwardIcon />,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationComponent;
