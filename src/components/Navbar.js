import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Navbar,
  NavbarBrand,
  NavLink,
  ProgressBar,
} from "react-bootstrap";
import { firestore, storage } from "../API/firebase";
import imageModel from "../models/imageModel";

const NavbarComponent = ({ images, setImages, setAllImages }) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterImages = images.filter((image) => image.data.name === img.name);
    if (!img) return window.alert("Please add image");

    if (filterImages.length > 0)
      return window.alert("This image is already present");
    const uploadRef = storage.ref(`images/${img.name}`);
    uploadRef.put(img).on(
      "state_change",
      (snapshot) => {
        const newProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(newProgress);
      },
      (error) => {
        return window.alert(error.message);
      },
      async () => {
        const url = await uploadRef.getDownloadURL();

        firestore
          .collection("images")
          .add(imageModel(img.name, url))
          .then(async (doc) => {
            const newDoc = await doc.get();
            setImages([...images, { data: newDoc.data(), id: newDoc.id }]);
            setAllImages([...images, { data: newDoc.data(), id: newDoc.id }]);
            setProgress(0);
            setShowModal(false);
            window.alert("image Uploaded Successfully!  ");
          });
      }
    );
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {progress ? "Uploading..." : "Upload Image"}
          </Modal.Title>
          {!progress && (
            <Button
              type="button"
              variant="white"
              bg="white"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body>
          {progress ? (
            <ProgressBar variant={"primary"} now={progress} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFile">
                <input
                  type="file"
                  className="form-control"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSubmit" className="my-2">
                <Button
                  type="submit"
                  variant="dark"
                  bg="dark"
                  className="form-control btn-block"
                >
                  Upload image
                </Button>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Navbar variant="dark" bg="dark" expand="lg">
        <NavbarBrand as={NavLink} href={"/"} style={{ marginLeft: "50px" }}>
          Image Uploading Website
        </NavbarBrand>
        <Button
          variant="outline-light"
          size="sm"
          style={{ marginLeft: "auto", marginRight: "50px" }}
          onClick={() => setShowModal(true)}
        >
          Upload
        </Button>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
