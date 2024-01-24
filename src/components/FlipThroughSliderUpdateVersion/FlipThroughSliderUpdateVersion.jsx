import React, { useEffect, useState } from "react";
import "./FlipThroughSliderUpdateVersion.css";

const FlipThroughSliderUpdateVersion = () => {
  const initialCarouselData = [
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
  ];

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

  // const handleDotClick = (clickedIndex) => {
  //   // console.log("clickedIndex===", clickedIndex);

  //   //To position in 3rd(focus element) we need to postion it after 2 index as we work with 5 element in view
  //   let positionBy = 2;

  //   // Reposition the carouselData to start from the new activeIndex
  //   const repositionedCarouselData = initialCarouselData
  //     .slice(clickedIndex - positionBy)
  //     .concat(initialCarouselData.slice(0, clickedIndex - positionBy));

  //   // Update the state with the new carouselData and activeIndex
  //   setCarouselData(repositionedCarouselData);
  //   setActiveIndex(clickedIndex);
  // };

  const handleDotClick = (clickedIndex) => {
    console.log("clickedIndex ===", clickedIndex);
    console.log("activeIndex ===", activeIndex);

    if (clickedIndex === activeIndex) {
      return; // Clicking the already active dot, no need to do anything
    }

    const direction =
      clickedIndex > activeIndex ||
      clickedIndex + carouselData.length < activeIndex
        ? 1
        : -1;

    // jump to clicked slider
    const repositionFn = setInterval(() => {
      // update active index until it match with clicked index
      setActiveIndex((prevActiveIndex) => {
        console.log("prevActiveIndex ===", prevActiveIndex);

        if (prevActiveIndex === clickedIndex) {
          clearInterval(repositionFn);
          return prevActiveIndex;
        }

        const nextIndex = prevActiveIndex + direction;

        // Reposition the carouselData
        setCarouselData((prevData) => {
          const updatedData =
            direction === 1
              ? [...prevData.slice(1), prevData[0]]
              : [
                  prevData[prevData.length - 1],
                  ...prevData.slice(0, prevData.length - 1),
                ];
          return updatedData;
        });

        return nextIndex;
      });
    }, 300);
  };

  useEffect(() => {
    let autoplayFn;
    // Set up the interval for automatic sliding if not hovered
    if (!isHovered) {
      autoplayFn = setInterval(() => {
        handleNext();
      }, 3000); // Change the interval duration as needed (in milliseconds)
    }
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(autoplayFn);
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
                <img src={item.imgUrl} alt={`image-${index + 1}`} />
                <p className="text-center">{item.id}</p>
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
                key={item.id}
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
