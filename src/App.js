import React, { useEffect, useState } from "react";
import { firestore } from "./API/firebase";

import "./App.css";
import Images from "./components/Images";
import NavbarComponent from "./components/Navbar";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    firestore
      .collection("images")
      .get()
      .then((images) => {
        const allImages = [];
        images.forEach((img) => {
          allImages.push({ data: img.data(), id: img.id });
        });

        setAllImages(allImages);
        setImages(allImages);
      });
  }, []);

  return (
    <>
      <NavbarComponent
        images={allImages}
        setImages={setImages}
        setAllImages={setAllImages}
      />
      <SearchBar images={allImages} setImages={setImages} />
      <Images
        images={images}
        allImages={allImages}
        setAllImages={setAllImages}
        setImages={setImages}
      />
    </>
  );
};

export default App;
