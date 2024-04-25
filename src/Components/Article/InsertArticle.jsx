import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { fetchscategories } from "../../Services/ScategorieService";
import { addArticle } from "../../Services/ArticleService";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const InsertArticle = ({ addProduct }) => {
  const [article, setArticle] = useState({
    reference: "",
    marque: "",
    designation: "",
    prix: 0,
    qtestock: 0,
    imageart: "",
    scategorieID: "",
  });

  const [sCategori, setScategorie] = useState([]);
  const [validated, setValidated] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getSCategorie();
  });

  const getSCategorie = async () => {
    fetchscategories().then((res) => {
      setScategorie(res.data);
    });
  };

  const handlechange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      console.log(article);
      //faire le add dans la BD
      addArticle(article)
        .then((res) => {
          //const response = res.data;
          // faire le add dans le tableau affiché
          console.log(res);
          addProduct(article);
          //vider le form
          handleReset();
          setValidated(false);
        })
        .catch((error) => {
          console.log(error.message);
          alert("Erreur ! Insertion non effectuée");
        });
    }
    setValidated(true);
  };
  const handleReset = () => {
    setArticle({});
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "esps2024");
        data.append("cloud_name", "doxomhjei");
        data.append("public_id", file.name);

        axios
          .post("https://api.cloudinary.com/v1_1/doxomhjei/image/upload", data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un Article
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form
          className="border p-3"
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form className="border p-3" onSubmit={handleSubmit}> */}
            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>Référence *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Référence"
                  name="reference"
                  value={article.reference}
                  onChange={(e) => handlechange(e)}

                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Désignation *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Désignation"
                  name="designation"
                  value={article.designation}
                  onChange={(e) => handlechange(e)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group className="col-md-6">
                <Form.Label>Marque *</Form.Label>

                <Form.Control
                  type="text"
                  required
                  placeholder="Marque"
                  name="marque"
                  value={article.marque}
                  onChange={(e) => handlechange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Prix</Form.Label>

                <Form.Control
                  type="number"
                  placeholder="Prix"
                  name="prix"
                  value={article.prix}
                  onChange={(e) => handlechange(e)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="col-md-6 ">
                <Form.Label>
                  Qté stock<span className="req-tag">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qté stock"
                  name="qtestock"
                  value={article.qtestock}
                  onChange={(e) => handlechange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image"
                  name="imageart"
                  value={article.imageart}
                  onChange={(e) => handlechange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select aria-label="Default select example " name="scategorieID" value={article.scategorieID} onChange={(e) => handlechange(e)}>
                  <option>Sélectionnez une catégorie</option>
                  {/* {console.log(scategorieID)} */}
                  {sCategori.map((scat) => (
                    // console.log(scat._id),

                    <option key={scat._id} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </Form.Select>
                {/* {scategories.map((scat, index) => (
                        <option value={scat._id}>{scat.nomscategorie}</option>
                      ))} */}
              </Form.Group>
            </Row>
            {/* <div className="text-center">
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link  className="btn btn-outline-danger mx-4" to="/articles">
                  Cancel
                  </Link>
                  </div> */}
            {/* </Form> */}
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
              <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={true}
                server={serverOptions()}
                name="file"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default InsertArticle;
