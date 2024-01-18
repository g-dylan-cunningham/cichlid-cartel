import deleteImages from "./deleteImages";

export default async function deleteSpecie(specie) {
  console.log("specie", specie);
  const thumbnailArr = specie.images.filter((elem) => elem.is_thumbnail);
  function onSuccess(res) {
    console.log("success", res);
  }
  function onFailure(res) {
    console.log("failure", res);
  }
  await Promise.all(
    thumbnailArr.map((img) => deleteImages(img, onSuccess, onFailure)),
  ) //.then((data) => {

  const { specie_id } = specie;
  try {
    const res = await fetch("/api/species", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specie_id }),
    })
    const data = await res.json();
    return data;

  } catch (e) {
    console.error('delete error', e);
  }
}
