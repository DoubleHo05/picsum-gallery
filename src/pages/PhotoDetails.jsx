import { useEffect, useState } from "react";
import { getPhotoInfo } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPhotoInfo(id);
        setPhoto(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!photo) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-2 border rounded"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-3">Photo #{photo.id}</h1>

      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full max-w-2xl rounded shadow mb-5"
      />

      <p className="text-xl font-bold">Author: {photo.author}</p>
      <p className="text-gray-600">Title: (No title provided)</p>
      <p className="text-gray-600">Description: (No description provided)</p>
    </div>
  );
}
