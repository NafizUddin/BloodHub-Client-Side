import PropTypes from "prop-types";

const SectionTitle = ({ sub, heading, description }) => {
  return (
    <div className="flex flex-col items-center mb-10 space-y-3">
      <h1 className="text-xl text-[#D60C0C]">{sub}</h1>
      <h1 className="text-5xl">{heading}</h1>
      <p className="max-w-3xl mx-auto text-center">{description}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  sub: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default SectionTitle;
