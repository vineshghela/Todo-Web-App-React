import axios from "axios";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

interface IProps {
  getContacts: contacts[] | undefined;
  getHeaders: () => GridColDef[];
  getAllContacts: () => string[];
  setSelectionModel: (item: GridSelectionModel) => void;
  selectionModel: GridSelectionModel;
  addNewRow: () => void;
}

interface contacts {
  id?: number;
  _id: { $oid: string };
  name: string;
  location: string;
  title: string;
}

// define the shape for the data

export const useTable = (): IProps => {
  const [getContacts, setContacts] = useState<contacts[]>();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  console.log(selectionModel);

  useEffect(() => {
    axios.get(`http://localhost:8080/users`).then((response) => {
      setContacts(response.data);
    });
  }, []);

  const getAllContacts = (): any[] => {
    let contact: any[] = [];
    if (getContacts)
      getContacts.forEach((element, index) => {
        const id = { id: Object.values(element["_id"]) };
        return contact.push({ ...element, ...id });
      });
    // addDeleteButton(contact);
    return contact;
  };

  const addNewRow = (): void => {
    const updatedContacts = getContacts?.unshift({
      _id: { $oid: "1234" },
      name: "",
      location: "",
      title: "",
    });
    console.log(updatedContacts);
    // setContacts(updatedContacts);
  };

  // const addDeleteButton=(contact)=>{

  // }

  const getHeaders = (): GridColDef[] => {
    let columns: GridColDef[] = [];
    if (getContacts) {
      let a = Object.keys(getContacts[0]);
      a.forEach((element) => {
        columns?.push({
          field: element === "_id" ? "id" : element,
          headerName: element === "_id" ? "ID" : element.toUpperCase(),
          width: 120,
        });
      });
    }

    return columns;
  };

  return {
    getContacts,
    getHeaders,
    getAllContacts,
    setSelectionModel,
    selectionModel,
    addNewRow,
  };
};
