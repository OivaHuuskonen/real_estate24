import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#51829B]">
    <div className="flex items-center pl-8">
      <h1 className="text-align:left text-6xl md:text-6xl xl:text-7xl font-yeseva-one-regular text-[#F5F5F5]">
        {title}
      </h1>
    </div>
  </div>
);

export default function RentLand() {
  return (
    <div className='w-full pb-6'>
    <div name="header">
      <PageHeader title="Rent Land"/>
    </div>
      <Sidebar />
      <div className="container mt-2">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
}