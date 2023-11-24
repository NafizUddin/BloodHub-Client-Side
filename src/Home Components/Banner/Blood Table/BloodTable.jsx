import SectionTitle from "../../../Components/Section Title/SectionTitle";

const BloodTable = () => {
  return (
    <div className="my-16">
      <SectionTitle
        sub={"Donor Eligibility Assessment Criteria"}
        heading={"Potential Donor Evaluation"}
        description={
          "Ensuring the safety and well-being of both donors and recipients is paramount, and as such, our comprehensive evaluation process assesses potential donors for eligibility based on factors such as medical history, lifestyle choices, and overall health to guarantee the highest standards in blood donation."
        }
      ></SectionTitle>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-gray-500 border-2 pb-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border-b-2">
              <th colSpan={10} className="text-center py-6 text-3xl">
                Donor
              </th>
            </tr>
            <tr className="text-center border-b-2">
              <th></th>
              <th className="py-5 w-[10%] text-lg px-1 border-x-2">
                Blood Type
              </th>
              <th className="py-5 text-lg border-x-2">O-</th>
              <th className="py-5 text-lg border-x-2">O+</th>
              <th className="py-5 text-lg border-x-2">B-</th>
              <th className="py-5 text-lg border-x-2">B+</th>
              <th className="py-5 text-lg border-x-2">A-</th>
              <th className="py-5 text-lg border-x-2">A+</th>
              <th className="py-5 text-lg border-x-2">AB-</th>
              <th className="py-5 text-lg border-x-2">AB+-</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b-2">
              <th
                scope="row"
                rowSpan={9}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap -rotate-90 text-3xl w-[7%] border-r-2"
              >
                Recipient
              </th>
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                AB+
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                AB-
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                A+
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                A-
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                B+
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                B-
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                O+
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
            <tr className="bg-white border-b-2">
              <td className="px-6 py-4 -2 text-center text-lg text-black border-r-2">
                O-
              </td>
              <td className="px-6 py-4 text-center text-xl border-r-2">🩸</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
              <td className="px-6 py-4 text-center text-xl border-r-2">❌</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodTable;
