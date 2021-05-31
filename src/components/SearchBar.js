import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const SearchBar = ({ images, setImages }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
    setImages(
      images.filter((img) => img.data.name.toLowerCase().includes(term.trim()))
    );
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto my-5">
          <Form.Group controlId="formBasic">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="h-100 bg-white border-0 border-bottom">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className=" border-0 border-bottom outline-0"
                style={{ boxShadow: "none" }}
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e)}
                value={term}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
