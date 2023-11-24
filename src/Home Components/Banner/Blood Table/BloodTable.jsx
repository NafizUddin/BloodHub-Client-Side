import { FaDroplet } from "react-icons/fa6";

const BloodTable = () => {
  return (
    <div className="my-16">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-gray-500 border-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border-b">
              <th colSpan={10} className="text-center py-6 text-3xl border-b">
                Donor
              </th>
            </tr>
            <tr className="text-center">
              <th></th>
              <th className="py-5 w-[10%] border-x-2 text-lg px-1">
                Blood Type
              </th>
              <th className="py-5 border-r-2 text-lg">O-</th>
              <th className="py-5 border-r-2 text-lg">O+</th>
              <th className="py-5 border-r-2 text-lg">B-</th>
              <th className="py-5 border-r-2 text-lg">B+</th>
              <th className="py-5 border-r-2 text-lg">A-</th>
              <th className="py-5 border-r-2 text-lg">A+</th>
              <th className="py-5 border-r-2 text-lg">AB-</th>
              <th className="py-5 border-r-2 text-lg">AB+-</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                rowSpan={9}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap -rotate-90 text-3xl w-[7%]"
              >
                Recipient
              </th>
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                AB+
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
              <td className="px-6 py-4 text-center text-xl border-t-2 border-r-2">
                🩸
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                AB-
              </td>
              <td className="px-6 py-4 text-center">🩸</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                A+
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                A-
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                B+
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                B-
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                O+
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-2 text-center text-lg text-black">
                O-
              </td>
              <td className="px-6 py-4 text-center flex justify-center">
                <FaDroplet className="text-[#D60C0C]" />
              </td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">Yes</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
              <td className="px-6 py-4 text-center">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodTable;
