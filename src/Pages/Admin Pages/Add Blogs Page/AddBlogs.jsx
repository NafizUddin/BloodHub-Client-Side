import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { ImSpinner6 } from "react-icons/im";
import useAxiosPublic from "../../../Custom Hooks/useAxiosPublic";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlogs = () => {
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecureInterceptors();
  const navigate = useNavigate();

  const handleAddBlog = (data) => {
    setLoading(true);

    if (!content) {
      // Show error message for the required field
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Blog Content can't be empty",
      });
      setLoading(false);
      return;
    }
    const imageFile = { image: data.photo[0] };

    axiosPublic
      .post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const blogInfo = {
            blogTitle: data.blogTitle,
            blogThumb: res.data.data.display_url,
            blogText: HTMLReactParser(content)?.props?.children,
            blogStatus: "draft",
          };

          console.log(blogInfo);
          axiosSecure.post("/blogs", blogInfo).then((res) => {
            if (res.data.insertedId) {
              setLoading(false);
              setContent("");
              Swal.fire("Good job!", "You added a new blog", "success");
              reset();
              navigate("/dashboard/content-management");
            }
          });
        }
      });
  };

  console.log(HTMLReactParser(content)?.props?.children);

  return (
    <div>
      <SectionTitle
        sub={"Life-Changing Stories of Compassion"}
        heading={"Add a New Blog"}
        description={
          "Explore inspiring narratives of donors, recipients, and the impact of your contribution on our blood donation blog. Discover the heartwarming journeys that make a difference in saving lives."
        }
      ></SectionTitle>

      <form
        onSubmit={handleSubmit(handleAddBlog)}
        className="mt-12 space-y-5 bg-transparent mx-auto pb-12"
        noValidate
      >
        <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
          <input
            type="text"
            {...register("blogTitle", {
              required: {
                value: true,
                message: "Blog Title is required",
              },
            })}
            className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
            placeholder="Enter Blog Title..."
          />
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors?.blogTitle?.message}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-xl mb-3">
            Blog Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", {
              required: { value: true, message: "User Photo is required" },
            })}
            className="file-input file-input-bordered file-input-error w-full max-w-sm"
            required
          />
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors?.photo?.message}
          </p>
        </div>

        <div className="pb-8">
          <label htmlFor="" className="text-xl mb-3">
            Blog Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => {}} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setContent(newContent)}
            className="mt-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
        >
          {loading ? (
            <ImSpinner6 className="animate-spin m-auto text-xl" />
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
