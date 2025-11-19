export default function PhotoCard({ photo, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border p-3 shadow hover:shadow-lg transition"
    >
      <img
        src={`https://picsum.photos/id/${photo.id}/300/200`}
        alt={photo.author}
        className="rounded mb-2 w-full h-48 object-cover"
      />
      <p className="font-semibold text-center">{photo.author}</p>
    </div>
  );
}
