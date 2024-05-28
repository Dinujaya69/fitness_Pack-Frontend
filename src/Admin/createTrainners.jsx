import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const CreateTrainners = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        const modifiedData = response.data.map((user, index) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
        }));
        setUsers(modifiedData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "phone",
      label: "Phone No",
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full ${
              value === "male" ? "bg-blue-500" : "bg-pink-500"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
  ];

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30, 40, 50],
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      components: {
        MuiTableCell: {
          head: {
            padding: "10px 4px",
          },
          body: {
            padding: "7px 15px",
            color: "#FFFFFF",
          },
        },
      },
    });

  return (
    <div className="bg-slate-700 py-10 min-h-screen grid place-items-center">
      <div className="w-10/12 max-w-4xl">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Members"}
            data={users}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CreateTrainners;
