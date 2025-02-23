import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="bg-[#F8F6F2] text-gray-900 font-sans">
     

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-bold leading-tight">WHERE EVERY <br /> PET'S JOY BEGINS!</h2>
        <p className="text-lg mt-4 text-gray-700">
          We know your pets are cherished members of your family. <br />
          That’s why we provide loving, personalized pet sitting services tailored to their needs.
        </p>
        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
          BOOK NOW
        </button>
      </section>
      
 
    </div>
  );
};

export default Home;
