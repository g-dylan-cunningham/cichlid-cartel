


export default async function deleteImages(img, onSuccess, onFailure) {
  // create two keys so we can delete both thumbnail and main.
  const imagesToBeDeleted = [
    { key: img.key, image_id: img.image_id }, // thumbnail
    {
      image_id: img.full_image_key,
      key: img.key.replace('/thumbnail/', '/full/'),
    }, // full image
  ];
  const response = await fetch('/api/images',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imagesToBeDeleted,
      }),
    }
  );

  if (response.ok) {
    onSuccess()
  } else {
    onFailure(response);
  }
};