import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { firestore, storage } from "../API/firebase";

const Images = ({ images, setAllImages, allImages, setImages }) => {
  const deleteImage = (url, docId) => {
    storage
      .refFromURL(url)
      .delete()
      .then(() => {
        firestore
          .collection("images")
          .doc(docId)
          .delete()
          .then(() => {
            setAllImages(allImages.filter((image) => image.data.url !== url));
            setImages(allImages.filter((image) => image.data.url !== url));
            alert("deletd successfully");
          });
      });
  };
  return (
    <Container fluid>
      <Row className="px-4 mt-5 gap-1 justify-content-center text-center">
        {images.length < 1 ? (
          <h1 className="text-center my-5">No Images Found</h1>
        ) : (
          images.map((img, index) => (
            <Card style={{ width: "33%" }} className="px-0" key={index}>
              <Card.Img
                src={img.data.url}
                style={{ height: "60%" }}
                alt={img.data.name}
              />
              <Card.Title
                style={{ height: "80px" }}
                className="pt-3 text-center w-100"
              >
                {img.data.name}
              </Card.Title>
              <Card.Footer className="bg-white pb-3 d-flex align-items-center justify-content-end w-100 border-0">
                <Button
                  variant="danger"
                  bg="danger"
                  onClick={() => deleteImage(img.data.url, img.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  &nbsp; Delete
                </Button>
              </Card.Footer>
            </Card>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Images;
