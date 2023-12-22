import React, { useState, useEffect } from "react";
import ImageUpload from "@/app/components/imageUpload";
import Modal from "@/app/components/Modal";
import { Button } from "@/app/components/forms";

const ImageSide = ({ specie, isEditable, showModal, setShowModal }) => {
  const [associatedImgs, setAssociatedImgs] = useState([]);
  const [imgsLoading, setImgsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  console.log('associatedimgs.', associatedImgs)
  useEffect(() => {
    setImgsLoading(true);
    fetch(
      "/api/images?" +
        new URLSearchParams({
          specie_id: specie.specie_id,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setAssociatedImgs(data);
        setImgsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [specie.specie_id]);

  const handleDeleteImg = async (e, img) => {
    e.preventDefault();
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/images",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: img.key,
          image_id: img.image_id,
        }),
      }
    );

    if (response.ok) {
      console.log("response ok", response);
      const newAssociatedImages = associatedImgs.filter((elem) => {
        console.log(elem, img);
        return elem.image_id !== img.image_id;
      });
      console.log("newassociimag", newAssociatedImages);
      setAssociatedImgs(newAssociatedImages);
    } else {
      console.log("response error", response);
    }
  };

  if (imgsLoading) {
    return <div>images loading...</div>
  }
  if (isEditable) {
    return <div>first, edit species info, then upload photos</div>;
  }

  return (
    <div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          heading="Upload Image"
          subheading={specie.common_name}
        >
          <ImageUpload
            specie={specie}
            associatedImgs={associatedImgs}
            setAssociatedImgs={setAssociatedImgs}
            setShowModal={setShowModal}
          />
        </Modal>
      )}

      {/* displays all associated images */}
      {associatedImgs.length > 0 ? (
        // images are present. display them
        <div>
          <h2 className="font-sans">Images for species:</h2>
          <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
            {associatedImgs.map((img) => {
              return (
                <div
                  className=""
                  style={{
                    position: "relative",
                    height: "200px",
                    flexGrow: "1",
                    padding: "5px",
                  }}
                  key={img.image_id}
                >
                  <DeleteIcon img={img} handleDeleteImg={handleDeleteImg}/>
                  <img
                    className=""
                    style={{
                      borderRadius: "10px",
                      maxHeight: "100%",
                      minWidth: "100%",
                      objectFit: "cover",
                      verticalAlign: "bottom",
                    }}
                    src={img.url}
                  />
                </div>
              );
            })}
            {/* empty div is to help styling of last element */}
            <div
              className=""
              style={{ height: "200px", flexGrow: "11", marginBottom: "20px" }}
            ></div>
          </div>

        </div>
      ) : (
        // no images present - add some
        <div>
          <h2 className="font-sans">You have no uploaded images. Please upload.</h2>
        </div>
      )}
                <div className="my-5 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              btnClass="min-w-fit"
              onClick={() => setShowModal(true)}
              text="Upload"
            />
          </div>
    </div>
  );
};

export default ImageSide;

const DeleteIcon = ({ img, handleDeleteImg }) => (
  <button
    title="Delete Image"
    className="deleteIcon"
    onClick={(e) => handleDeleteImg(e, img)}
    style={{
      zIndex: "10",
      position: "absolute",
      right: "20px",
      height: "20px",
      width: "20px",
    }}
  >
    <div
      style={{
        position: "relative",
        borderRadius: "50%",
        border: "5px solid black",
        height: "30px",
        width: "30px",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "30px",
          color: "white",
          right: "3px",
          top: "-14px",
          fontFamily: "sans-serif",
          height: "20px",
        }}
      >
        x
      </div>
    </div>
  </button>
);
