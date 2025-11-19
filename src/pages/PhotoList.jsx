import { useEffect, useState, useRef, useCallback } from "react";
import { getPhotos } from "../api";
import PhotoCard from "../components/PhotoCard";
import { useNavigate } from "react-router-dom";

export default function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const loadPhotos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPhotos = await getPhotos(page);
      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadPhotos();
  }, [page]);

  const observer = useRef();

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Picsum Photos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return (
              <div ref={lastPhotoRef} key={photo.id}>
                <PhotoCard
                  photo={photo}
                  onClick={() => navigate(`/photos/${photo.id}`)}
                />
              </div>
            );
          } else {
            return (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => navigate(`/photos/${photo.id}`)}
              />
            );
          }
        })}
      </div>

      {loading && <p className="text-center mt-5">Loading...</p>}
      {!hasMore && <p className="text-center mt-5">No more photos.</p>}
    </div>
  );
}
