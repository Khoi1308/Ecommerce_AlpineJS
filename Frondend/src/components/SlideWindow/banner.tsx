import { useEffect, useState } from "react";

export default function CarouselBanner({
  children: banners,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [cur, setCur] = useState(0);

  const prev = () =>
    setCur((cur) => (cur === 0 ? banners.length - 1 : cur - 1));

  const next = () =>
    setCur((cur) => (cur === banners.length - 1 ? 0 : cur + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden max-w-[700px] relative rounded-lg pb-2">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {banners}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-2 group">
        {/* Left chevron */}
        <button className="opacity-0 hover:bg-sky-100 rounded-full p-2 group-hover:opacity-100" onClick={prev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {/* right chevron */}
        <button className="opacity-0 hover:bg-sky-100 rounded-full p-2 group-hover:opacity-100" onClick={next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center gap-2 justify-center">
          {banners.map((_, index) => (
            <div
              className={`transition-all w-3 h-1 bg-gray-600 rounded-lg ${
                cur === index ? "w-5 bg-blue-500" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
