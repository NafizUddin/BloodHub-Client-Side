import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="relative h-screen">
      <img
        src="https://i.ibb.co/xX50kmW/photo-1638271522560-a247d127deb8-1.webp"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75 h-full">
        <div className="flex flex-col justify-center items-center h-full max-w-2xl mx-auto">
          <h1 className="mb-5 text-6xl md:text-8xl font-bold text-white text-center">
            404
          </h1>
          <h1 className="mb-5 text-4xl md:text-6xl font-bold text-white text-center">
            Page Not Found
          </h1>
          <div className="divider w-80 mx-auto text-white"></div>
          <p className="mb-5 md:text-lg text-white text-center mx-5">
            Sorry but we couldn&apos;t find the page you are looking for. Please
            check to make sure you&apos;ve typed the URL correctly.
          </p>
          <Link to="/">
            <button className="bg-[#D60C0C] outline text-[white] px-4 py-3 rounded-lg hover:bg-[#AB0A0A] flex items-center">
              <FaHome className="text-white mr-2" /> Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

{
  /* <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://i.ibb.co/xX50kmW/photo-1638271522560-a247d127deb8-1.webp)",
  }}
>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-2xl">
      <h1 className="mb-5 text-8xl font-bold">404</h1>
      <h1 className="mb-5 text-6xl font-bold">Page Not Found</h1>
      <div className="divider w-80 mx-auto"></div>
      <p className="mb-5 text-lg">
        Sorry but we couldn&apos;t find the page you are looking for. Please
        check to make sure you&apos;ve typed the URL correctly.
      </p>
      <Link to="/">
        <button className="bg-[#D60C0C] outline text-[white] px-4 py-3 rounded-lg hover:bg-[#AB0A0A]">
          Back to Home
        </button>
      </Link>
    </div>
  </div>
</div>; */
}
