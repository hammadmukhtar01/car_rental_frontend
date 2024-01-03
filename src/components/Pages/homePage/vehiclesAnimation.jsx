import { Carousel } from 'react-responsive-3d-carousel'
import "react-awesome-slider/dist/styles.css";

const Slider = () => {
  const img1 = "https://milelecarrental.com/Thumbnails/TN%20-%20PICANTO.jpg";
  const img2 = "https://milelecarrental.com/Thumbnails/TN%20-%20KICKS.jpg";
  const img3 = "https://milelecarrental.com/Thumbnails/TN%20-%20CAPTIVA.jpg";

  return (
    <div className='' style={{backgroundColor: ""}}>
      <Carousel>
      <img src={img1} alt="exampleimage-1" />
      <img src={img2} alt="example-mage-2" />
      <img src={img3} alt="example-mage-2" />
      <img src={img3} alt="example-mage-2" />
      <img src={img3} alt="example-mage-2" />
      <img src={img3} alt="example-mage-2" />
      <video src="https://www.youtube.com/watch?v=0wmau_DmRL4" muted autoPlay loop />
      <iframe src="https://www.youtube.com/embed/example" title="YouTube video player" />
      
    </Carousel>
    </div>
  );
};

export default Slider;
