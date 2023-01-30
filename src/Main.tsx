import { Box, Button, Container, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useTable } from "./hooks";
import ManageUsers from "./ManageUsers";
import { CustomNoRowsOverlay } from "./Utils";

export const Main = () => {
  const {
    getContacts,
    getHeaders,
    getAllContacts,
    setSelectionModel,
    selectionModel,
    addNewRow,
  } = useTable();

  let columnHeaders: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
  ];

  const rows = getAllContacts();

  return (
    <>
      <Container maxWidth="md">
        <h2>Welcome to my site</h2>
        <Grid container>
          <Box sx={{ height: 350, width: "100%" }}>
            <ManageUsers />
            {getContacts ? (
              <DataGrid
                rows={rows}
                columns={getHeaders()}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                  Toolbar: GridToolbar,
                }}
              />
            ) : (
              <h1>Headers</h1>
            )}
          </Box>
        </Grid>
      </Container>
    </>
  );
};
