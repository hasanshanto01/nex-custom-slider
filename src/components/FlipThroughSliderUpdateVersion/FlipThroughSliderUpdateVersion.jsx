import React from "react";
import "./FlipThroughSliderUpdateVersion.css";

const FlipThroughSliderUpdateVersion = () => {
  const [carouselData, setCarouselData] = useState([
    {
      id: 1,
      imgUrl: "https://picsum.photos/id/233/1000/500",
    },
    {
      id: 2,
      imgUrl: "https://picsum.photos/id/234/1000/500",
    },
    {
      id: 3,
      imgUrl: "https://picsum.photos/id/235/1000/500",
    },
    {
      id: 4,
      imgUrl: "https://picsum.photos/id/236/1000/500",
    },
    {
      id: 5,
      imgUrl: "https://picsum.photos/id/237/1000/500",
    },
    {
      id: 6,
      imgUrl: "https://picsum.photos/id/238/1000/500",
    },
    {
      id: 7,
      imgUrl: "https://picsum.photos/id/239/1000/500",
    },
    {
      id: 8,
      imgUrl: "https://picsum.photos/id/240/1000/500",
    },
  ]);

  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);

  const handlePrev = () => {
    // console.log("prev");

    const updatedCarouselData = [
      carouselData[carouselData.length - 1],
      ...carouselData.slice(0, carouselData.length - 1),
    ];

    // console.log("updatedCarouselData===", updatedCarouselData);

    setCarouselData(updatedCarouselData);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleNext = () => {
    // console.log("next");

    const updatedCarouselData = [...carouselData.slice(1), carouselData[0]];

    // console.log("updatedCarouselData===", updatedCarouselData);

    setCarouselData(updatedCarouselData);
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handleDotClick = (index) => {
    console.log("clicked dot===", index);

    // Handle dot click by setting the active index
    setActiveIndex(index);
  };

  useEffect(() => {
    let intervalFn;

    // Set up the interval for automatic sliding if not hovered
    if (!isHovered) {
      intervalFn = setInterval(() => {
        handleNext();
      }, 3000); // Change the interval duration as needed (in milliseconds)
    }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalFn);
    };
  }, [carouselData, isHovered]);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-3">
        Flip Through Slider Update Version
      </h2>
      <div>
        <div className="cl">
          <div
            className="cl-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {carouselData?.slice(0, 5)?.map((item, index) => (
              <div className={`cl-item cl-item-${index + 1}`} key={item.id}>
                <img src={item.imgUrl} alt="" />
              </div>
            ))}
          </div>
          <div className="cl-controls">
            <button className="btn btn-sm" onClick={handlePrev}>
              Prev
            </button>
            <button className="btn btn-sm" onClick={handleNext}>
              Next
            </button>
          </div>
          <div className="cl-dots-container">
            {carouselData?.map((item, index) => (
              <div
                className={`cl-dot ${
                  index === activeIndex ? "cl-dot-active" : ""
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipThroughSliderUpdateVersion;
