import PropTypes from "prop-types";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

const PublicBlogCard = ({ blog }) => {
  // console.log(Object.keys(blog).join(", "));
  // _id, blogTitle, blogThumb, blogText, blogStatus
  const { blogTitle, blogThumb, blogText } = blog;
  const shareUrl = "https://www.example.com";
  const shareTitle = "Share this content";
  const shareDescription = "This is a great piece of content.";
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

          <div className="flex gap-3 justify-center items-center pb-8">
            <h1 className="text-lg font-semibold">Share With: </h1>
            <FacebookShareButton
              url={shareUrl}
              quote={shareDescription}
              hashtag="#example"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              description={shareDescription}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
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
