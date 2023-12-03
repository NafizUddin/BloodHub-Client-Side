import { useQuery } from "@tanstack/react-query";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import PublicBlogCard from "../../Components/Public Blog Card/PublicBlogCard";
import donate from "../../assets/Icons/blood-donation.png";

const PublicBlog = () => {
  const axiosSecure = useAxiosSecureInterceptors();
  const {
    data: publishedBlogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishedBlogs?status=published");
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        sub={"Life-Changing Stories of Compassion"}
        heading={"Stories that Save Lives"}
        description={
          "Explore inspiring narratives of donors, recipients, and the impact of your contribution on our blood donation blog. Discover the heartwarming journeys that make a difference in saving lives."
        }
      ></SectionTitle>

      {publishedBlogs?.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mx-6 xl:mx-0 ">
          {publishedBlogs?.map((blog) => (
            <PublicBlogCard key={blog?._id} blog={blog}></PublicBlogCard>
          ))}
        </div>
      ) : (
        <div className="h-[350px] flex flex-col justify-center items-center gap-5">
          <img src={donate} className="w-28 md:w-40" />
          <p className="md:max-w-3xl lg:mx-auto text-center mx-6 md:mx-10 text-2xl md:text-3xl text-[#D60C0C]">
            Sorry, No Data Found.
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicBlog;
