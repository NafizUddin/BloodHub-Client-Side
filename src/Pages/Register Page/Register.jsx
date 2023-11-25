import { useEffect } from "react";
import signUpAnimation from "../../assets/signUpAnimation.json";
import Lottie from "lottie-react";
import AuthNavbar from "../../Components/Auth Navbar/AuthNavbar";
import RegisterForm from "../../Components/Register Form/RegisterForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/RedLogo.png";
import LoginForm from "../../Components/Login Form/LoginForm";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>BloodHub | Register</title>
      </Helmet>
      <div
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/6823603/pexels-photo-6823603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
        className="m-auto xl:container px-12 sm:px-0 mx-auto bg-no-repeat  bg-cover py-14"
      >
        <div className="mx-auto h-full max-w-xl lg:max-w-2xl xl:max-w-4xl">
          <div className="m-auto">
            <div className="rounded-3xl border -mx-6 sm:-mx-10 p-8 sm:p-10 backdrop-blur-md">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <img src={logo} className="w-60" alt="" />
                </Link>
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-center">
                Create an account
              </h3>
              <RegisterForm></RegisterForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
