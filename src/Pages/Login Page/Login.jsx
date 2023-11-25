import { useEffect } from "react";
import LoginForm from "../../Components/Login Form/LoginForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/RedLogo.png";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>BloodHub | Login</title>
      </Helmet>
      {/* Login Form */}

      <div
        style={{
          backgroundImage:
            "url(https://www.sriramakrishnahospital.com/wp-content/uploads/2021/06/Blood-Donation-1.jpg)",
        }}
        className="m-auto xl:container px-12 sm:px-0 mx-auto bg-no-repeat bg-cover bg-right lg:bg-center py-14"
      >
        <div className="mx-auto h-full sm:w-max">
          <div className="m-auto">
            <div className="rounded-3xl border -mx-6 sm:-mx-10 p-8 sm:p-10 backdrop-blur-md">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <img src={logo} className="w-60" alt="" />
                </Link>
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4 text-center">
                Login to your account
              </h3>
              <LoginForm></LoginForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
