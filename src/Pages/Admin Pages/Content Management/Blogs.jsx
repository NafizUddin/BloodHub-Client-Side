import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/Section Title/SectionTitle";

const Blogs = () => {
  return (
    <div>
      <SectionTitle
        sub={"Life-Changing Stories of Compassion"}
        heading={"Stories that Save Lives"}
        description={
          "Explore inspiring narratives of donors, recipients, and the impact of your contribution on our blood donation blog. Discover the heartwarming journeys that make a difference in saving lives."
        }
      ></SectionTitle>

      <div className="w-full flex justify-end items-center">
        <Link to="/dashboard/addBlogs">
          <button className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white">
            Add New Blog
          </button>
        </Link>
      </div>

      <h1>Hello mMama</h1>
    </div>
  );
};

export default Blogs;
