import useUserDetails from "../../../Custom Hooks/useUserDetails";

const DonorHome = () => {
  const { loadedUser } = useUserDetails();
  return (
    <div className="space-y-3">
      <h1 className="text-[#D60C0C] text-3xl font-semibold text-center">{`Hi ${loadedUser?.name},`}</h1>
      <h1 className="text-[#D60C0C] text-4xl font-bold text-center">
        Welcome to BloodHub
      </h1>
      <p className="xl:max-w-2xl mx-auto text-center">
        Our platform connects donors with those in need, fostering a network of
        generosity that transcends borders. Together, we strive to make a
        significant impact in the world of blood donation, ensuring that every
        drop contributes to the gift of life.
      </p>
    </div>
  );
};

export default DonorHome;
