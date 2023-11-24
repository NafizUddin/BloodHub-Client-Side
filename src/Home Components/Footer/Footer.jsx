import logo from "../../assets/Logo/RedLogo.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-12">
      <div className="relative">
        <img
          src="https://i.ibb.co/RY2FgSb/photo-1615461066159-fea0960485d5-1.webp"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-80 h-full">
          <div className="flex items-end w-full text-white">
            <footer className="w-full">
              <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
                <div className="flex-shrink-0 mx-auto text-center lg:mx-0 lg:text-left md:mb-10 lg:mb-0">
                  <div className="flex items-center justify-center font-medium lg:justify-start">
                    <img src={logo} className="w-[200px] mb-2"></img>
                  </div>
                  <p className="text-lg">Turning Drops into Lifelines</p>
                  <div className="mt-5">
                    <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start gap-3">
                      <a className="cursor-pointer hover:text-[#D60C0C] text-xl">
                        <FaFacebook></FaFacebook>
                      </a>
                      <a className="ml-3 cursor-pointer hover:text-[#D60C0C] text-xl">
                        <FaTwitter></FaTwitter>
                      </a>
                      <a className="ml-3 cursor-pointer hover:text-[#D60C0C] text-xl">
                        <FaInstagram></FaInstagram>
                      </a>
                      <a className="ml-3 cursor-pointer hover:text-[#D60C0C] text-xl">
                        <FaLinkedinIn></FaLinkedinIn>
                      </a>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
                  <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest  uppercase">
                      About
                    </h2>
                    <nav className="mb-10 list-none">
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Company
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Careers
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Blog
                        </a>
                      </li>
                    </nav>
                  </div>
                  <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest uppercase">
                      Support
                    </h2>
                    <nav className="mb-10 list-none">
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Contact Support
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Help Resources
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Release Updates
                        </a>
                      </li>
                    </nav>
                  </div>
                  <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest uppercase">
                      Platform
                    </h2>
                    <nav className="mb-10 list-none">
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Terms &amp; Privacy
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Pricing
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          FAQ
                        </a>
                      </li>
                    </nav>
                  </div>
                  <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest uppercase">
                      Contact
                    </h2>
                    <nav className="mb-10 list-none">
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Send a Message
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          Request a Quote
                        </a>
                      </li>
                      <li className="mt-3">
                        <a className="cursor-pointer hover:text-[#D60C0C]">
                          +880181000000
                        </a>
                      </li>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="bg-[#D60C0C]">
                <div className="container px-5 py-4 mx-auto">
                  <p className="text-sm text-white capitalize xl:text-center">
                    © 2023 All rights reserved{" "}
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
