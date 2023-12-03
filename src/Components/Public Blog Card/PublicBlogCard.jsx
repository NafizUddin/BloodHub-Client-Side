import PropTypes from "prop-types";

const PublicBlogCard = ({ blog }) => {
  // console.log(Object.keys(blog).join(", "));
  // _id, blogTitle, blogThumb, blogText, blogStatus
  const { blogTitle, blogThumb, blogText } = blog;
  return (
    <div>
      <div className="mx-auto">
        <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto shadow-lg">
          <a href="#">
            <img
              className="w-full h-[320px]"
              src={blogThumb}
              alt="Blog thumbnail"
            />
          </a>
          <div className="relative -mt-16 px-10 pt-5 bg-white m-10 flex flex-col">
            <h1 className="font-semibold text-lg hover:text-[#D60C0C] transition duration-500 ease-in-out xl:h-[60px]">
              {blogTitle}
            </h1>
            <p className="text-gray-500 text-sm xl:h-[525px]">{blogText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PublicBlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default PublicBlogCard;
