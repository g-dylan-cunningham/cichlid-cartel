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
  Promise.all(
    thumbnailArr.map((img) => deleteImages(img, onSuccess, onFailure)),
  ).then((data) => {
    console.log("data returned", data);
    const { specie_id } = specie;
    fetch("/api/species", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specie_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete data", data);
      })
      .catch((e) => console.log(e));
  });
}
