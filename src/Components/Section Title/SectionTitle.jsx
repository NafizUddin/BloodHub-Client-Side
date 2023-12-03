import PropTypes from "prop-types";

const SectionTitle = ({ sub, heading, description }) => {
  return (
    <div className="flex flex-col items-center mb-10 space-y-3">
      <h1 className="md:text-xl text-[#D60C0C] text-center">{sub}</h1>
      <h1 className="text-3xl md:text-5xl text-center">{heading}</h1>
      <p className="md:max-w-3xl lg:mx-auto text-center mx-6 md:mx-10">
        {description}
      </p>
    </div>
  );
};

SectionTitle.propTypes = {
  sub: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default SectionTitle;
