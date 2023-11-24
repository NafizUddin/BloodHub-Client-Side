import SectionTitle from "../../Components/Section Title/SectionTitle";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <SectionTitle
        sub={"Get In Touch"}
        heading={"Contact Us"}
        description={
          "Our dedicated team of professionals is here to assist you with any inquiries or concerns you may have about the blood donation process, ensuring a smooth and efficient experience for both donors and recipients."
        }
      ></SectionTitle>
      <div className="w-full pb-8 px-6 mt-5 md:mt-0 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="mb-8 lg:mb-0 w-full h-[650px] md:h-full bg-[#D60C0C] text-white px-7 pb-10 rounded-md">
            <div className="space-y-4">
              <h1 className="pt-10 font-semibold text-lg">Blood Excellence!</h1>
              <h1 className="text-4xl font-bold">
                Expanded Blood Donate Services Here
              </h1>
              <p>
                Explore our expanded blood donation services with extended
                hours, convenient locations, and quick, hassle-free processes.
                Our targeted community outreach ensures maximum impact, while
                enhanced rewards await your life-saving contribution. Your
                commitment matters, and we&apos;ve made it more accessible and
                rewarding than ever.
              </p>
              <div className="flex items-center gap-4">
                <FaLocationDot className="text-lg" />
                <span className="text-lg">Chattogram,Bangladesh</span>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-lg" />
                <span className="text-lg">+8801800000000</span>
              </div>
              <div className="flex items-center gap-4">
                <MdMarkEmailRead className="text-lg" />
                <span className="text-lg">bloodhub@domain.com</span>
              </div>
              <div className="flex items-center gap-8">
                <FaFacebook className="text-xl" />
                <FaInstagram className="text-xl" />
                <FaYoutube className="text-xl" />
                <FaLinkedinIn className="text-xl" />
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-7">
            <div className="mx-auto w-full md:max-w-[550px]">
              <form>
                <div className="mb-5">
                  <label htmlFor="name" className="mb-3 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-red-600 focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="mb-3 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@domain.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-red-600 focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="subject" className="mb-3 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-red-600 focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="message" className="mb-3 block">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    id="message"
                    placeholder="Type your message"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-red-600 focus:shadow-md"
                  ></textarea>
                </div>
                <div>
                  <button className="bg-[#D60C0C] px-4 py-3 rounded-lg text-white hover:bg-white hover:text-[#D60C0C] hover:outline">
                    Contact Us
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
