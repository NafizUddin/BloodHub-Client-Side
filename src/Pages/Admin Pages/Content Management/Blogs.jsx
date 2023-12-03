import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../../Components/Loading/Loading";

const Blogs = () => {
  const [selectedStatus, setSelectedStatus] = useState("draft");
  const axiosSecure = useAxiosSecureInterceptors();

  const {
    data: allBlogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  const handleSelectChange = (event) => {
    // Update the state with the selected value
    setSelectedStatus(event.target.value);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(allBlogs);
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

      <div className="w-full flex justify-start items-center mt-4">
        <select value={selectedStatus} onChange={handleSelectChange}>
          <option value="">Filter By</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 mt-8 mb-12">
        {allBlogs?.map((blog) => (
          <div
            key={blog?._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full"
          >
            <img
              src={blog?.blogThumb}
              alt="Mountain"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {blog?.blogTitle}
              </h2>
              <p className="text-gray-700 leading-tight mb-4">
                {blog?.blogText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
