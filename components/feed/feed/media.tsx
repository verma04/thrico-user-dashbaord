
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const Media = ({ media }: { media: string[] }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  });

  if (!media || media.length === 0) return null;

  return (
    <div className="w-full flex justify-center items-center">
      <div
        ref={sliderRef}
        className="keen-slider w-full max-w-xl rounded-lg overflow-hidden"
      >
        {media.map((item, idx) => (
          <div
            className="keen-slider__slide flex justify-center items-center"
            key={idx}
          >
            <img
              src={`https://cdn.thrico.network/${item}`}
              alt={`media-${idx}`}
              className="object-contain w-full h-52 bg-white"
              style={{ maxHeight: 220 }}
            />
          </div>
        ))}
      </div>
      {media.length > 1 && (
        <div className="flex justify-center mt-2 gap-2">
          {media.map((_, idx) => (
            <span
              key={idx}
              className="inline-block w-2 h-2 rounded-full bg-primary opacity-50"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;

