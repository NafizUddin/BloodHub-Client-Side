import Lottie from "lottie-react";
import loading from "../../assets/loadingAnimation.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[350px]">
        <Lottie animationData={loading} loop={true} />
        <p className="text-4xl font-semibold dark:text-primary text-center -mt-24">
          Loading.....
        </p>
      </div>
    </div>
  );
};

export default Loading;
