import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../../Components/Loading/Loading";
import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";

const Blogs = () => {
  const [selectedStatus, setSelectedStatus] = useState("draft");
  const axiosSecure = useAxiosSecureInterceptors();
  const [loading, setLoading] = useState(false);

  const {
    data: allBlogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBlogs", selectedStatus],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data.filter(
        (singleBlog) => singleBlog?.blogStatus === selectedStatus
      );
    },
  });

  const handleSelectChange = (event) => {
    // Update the state with the selected value
    setSelectedStatus(event.target.value);
  };

  const handleStatusChange = (blog, status) => {
    setLoading(true);

    const { blogStatus, _id, ...restInfo } = blog;
    const newBlogInfo = { ...restInfo, blogStatus: status };
    console.log(newBlogInfo);

    axiosSecure
      .patch(`/blogs/singleBlog/${blog?._id}`, newBlogInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setLoading(false);
          toast.success("You have Updated the Blog Status");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

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
                {blog?.blogText?.slice(0, 350)}........
              </p>
              <div className="mt-3">
                {blog?.blogStatus === "draft" ? (
                  <button
                    onClick={() => handleStatusChange(blog, "published")}
                    className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
                  >
                    {loading ? (
                      <ImSpinner6 className="animate-spin m-auto text-xl" />
                    ) : (
                      "Publish Blog"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(blog, "draft")}
                    className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
                  >
                    Unpublish Blog
                  </button>
                )}
              </div>
              <div className="mt-3">
                <button className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white">
                  Delete Blog
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
