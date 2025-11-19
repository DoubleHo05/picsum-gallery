const BASE_URL = "https://picsum.photos/v2";

export async function getPhotos(page = 1, limit = 20) {
  const res = await fetch(`${BASE_URL}/list?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch photos");
  return res.json();
}

export async function getPhotoInfo(id) {
  const res = await fetch(`https://picsum.photos/id/${id}/info`);
  if (!res.ok) throw new Error("Failed to fetch photo details");
  return res.json();
}
