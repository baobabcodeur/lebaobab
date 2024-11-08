import "./carousel.scss";
import { useState } from "react";

type Props = {
    images: string[]
}

export const Carousel = (props: Props) => {

    const [startIndex, setStartIndex] = useState(0);

    const goToPrevious = () => {
      setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    };
  
    const goToNext = () => {
      setStartIndex((prevIndex) => Math.min(prevIndex + 4, props.images.length - 4));
    };
  
    const visibleImages = props.images.slice(startIndex, startIndex + 4);

  return (
    <div className="carousel">
 <button onClick={goToPrevious} className="sidebar__button" disabled={startIndex === 0}>
        {"<"}
      </button>

      <div className="sidebar__images">
        {visibleImages.map((src, index) => (
          <img key={index} src={src} alt={`Image ${startIndex + index + 1}`} className="sidebar__image" style={{ width: 250 , height: 200}} />
        ))}
      </div>

      <button onClick={goToNext} className="sidebar__button" disabled={startIndex >= props.images.length - 4}>
        {">"}
      </button>
    </div>
  )
}
