const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-transparent p-2"
  >
    <FaArrowRight className="text-gray-400 hover:text-black text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-transparent p-2"
  >
    <FaArrowLeft className="text-gray-400 hover:text-black text-xl" />
  </div>
);
