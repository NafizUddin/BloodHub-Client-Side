import PropTypes from "prop-types";

const PublicBlogCard = ({ blog }) => {
  // console.log(Object.keys(blog).join(", "));
  // _id, blogTitle, blogThumb, blogText, blogStatus
  const { blogTitle, blogThumb, blogText, blogStatus } = blog;
  return (
    <div>
      <div className="mx-auto">
        <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto shadow-lg">
          <a href="#">
            <img
              className="w-full h-[315px]"
              src={blogThumb}
              alt="Blog thumbnail"
            />
          </a>
          <div className="relative -mt-16 px-10 pt-5 bg-white flex flex-col">
            <h1 className="font-semibold text-lg hover:text-[#D60C0C] transition duration-500 ease-in-out mb-4">
              {blogTitle}
            </h1>
            <p className="text-gray-500 text-sm h-[500px]">{blogText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PublicBlogCard.propTypes = {
  blog: PropTypes.node.isRequired,
};

export default PublicBlogCard;
