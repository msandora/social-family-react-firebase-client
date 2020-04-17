{screamImages.map((image,i) => <img key={i} src={image}/>)}


{screamImages.map((image, index) => {
  console.log("Image", image);
  return (
      <img key={index} src={image} alt="test" />
  );
})}