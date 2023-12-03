import PropTypes from "prop-types";

const PublicBlogCard = (props) => {
  return (
    <div>
      <div className="mx-auto p-5 sm:p-10 md:p-16">
        <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
          <a href="#">
            <img
              className="w-full"
              src="https://images.pexels.com/photos/5120892/pexels-photo-5120892.jpeg?auto=compress&amp;cs=tinysrgb&amp;fit=crop&amp;h=625.0&amp;sharp=10&amp;w=1000"
              alt="Sunset in the mountains"
            />
          </a>
          <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white m-10">
            <a
              href="#"
              className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out  mb-2"
            >
              The Best Activewear from the Nordstrom Anniversary Sale
            </a>
            <p className="text-gray-500 text-sm">
              Today, I’m covering one of my favorite parts of the Nordstrom
              Anniversary Sale: the activewear!
            </p>
            <p className="mt-5 text-gray-600 text-xs">
              By
              <a
                href="#"
                className="text-xs text-indigo-600 transition duration-500 ease-in-out"
              >
                Mehdi Ahmadi
              </a>{" "}
              | in{" "}
              <a
                href="#"
                className="text-xs text-indigo-600 transition duration-500 ease-in-out"
              >
                Cooking
              </a>
              ,{" "}
              <a
                href="#"
                className="text-xs text-indigo-600 transition duration-500 ease-in-out"
              >
                Recipe
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PublicBlogCard.propTypes = {};

export default PublicBlogCard;
