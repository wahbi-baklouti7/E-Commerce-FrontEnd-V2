import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
// import { MRT_Localization_ES } from 'material-react-table/locales/es/index.esm.js';
import EditArticle from "./EditArticle";

const ListArticles = ({ articles, deleteProduct,updateProduct }) => {
  {
    console.log("inside memo");
  }

  const [show, setShow] = useState("");
  const [art, setArt] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modifArt = (value) => {
    handleShow();
    setArt(value);
  };
  const columns = useMemo(
    () => [
      // console.log('inside memo'),
      {
        accessorKey: "imageart", //access nested data with dot notation
        header: "Image",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt=""
              height={100}
              src={cell.getValue()}
              loading="lazy"
              style={{ borderRadius: "20%" }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "reference", //access nested data with dot notation
        header: "Reference",
        size: 150,
      },
      {
        accessorKey: "designation",
        header: "Designation",
        size: 150,
      },
      {
        accessorKey: "marque", //normal accessorKey
        header: "Marque",
        size: 200,
      },
      {
        accessorKey: "qtestock",
        header: "Quantité Stock",
        size: 150,
      },
      {
        accessorKey: "prix",
        header: "Prix",
        size: 150,
      },
      {
        accessorKey: "_id",
        header: "actions",
        size: 100,
        Cell: ({ cell, row }) => (
          <div>
            <Button
              variant="warning"
              size="md"
              style={{ float: "left" }}
              className="text-warning btn-link edit"
              onClick={() => {
                modifArt(cell.row.original);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              onClick={(e) => {
                deleteProduct(
                  cell.row.original._id,
                  cell.row.original.reference,e
                );
              }}
              variant="danger"
              size="md"
              className="text-danger btn-link delete"
            >
              <i className="fa fa-trash" />
            </Button>
          </div>
        ),
      },
    ],
    [articles]
  );
  const [data, setData] = useState(articles);

  const table = useMaterialReactTable({
    autoResetPageIndex: false,

    columns,
    data: articles,
    //   enableColumnDragging: true,
    enableRowOrdering: true,
    enableSorting: false,
    localization: {
      actions: "Ações",
      and: "e",
      cancel: "Cancelar",
      changeFilterMode: "Alterar o modo de filtro",
      changeSearchMode: "Alterar o modo de pesquisa",
      clearFilter: "Limpar filtros",
      clearSearch: "Limpar pesquisa",
      clearSort: "Limpar classificações",
      clickToCopy: "Clique para copiar",
      // ... and many more - see link below for full list of translation keys
    },

    //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <>
            {articles.length === 0 && <div className="text-center">Loading...</div>}

      {show && (
        <EditArticle
          show={show}
          handleClose={handleClose}
          art={art}
          updateProduct={updateProduct}
        />
      )}

      {articles.length > 0 && (
        <>
          <MaterialReactTable table={table} />;
        </>
      )}
    </>
  );
};

export default ListArticles;
