import React, { useEffect, useState } from "react";
import Api from "../../services/api";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await Api.getPhotos();
        setPhotos(photosData);
      } catch (error) {
        console.error("Errore durante il recupero delle foto:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Elenco delle Foto</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.img} alt={photo.title} />
            <p>{photo.title}</p>
            <p>{photo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
