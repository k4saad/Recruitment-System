import React from "react";
import { Link } from "react-router-dom";

const RequirementForAdminCard = ({requirement, deleteRequirement}) => {
    return (
      <div
      className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5"
      >
      <Link
      to={`/admin/requirement/detail/${requirement.requirementId}`}
      >
        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
          {requirement.title}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Company : {requirement.organizationName}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg ">
          Location : {requirement.location}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Salary : {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}
        </p>
      </Link>
      <button
      onClick={deleteRequirement}
      className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
          text-white font-bold py-2 px-4 my-5 focus:outline-none mx-auto
          focus:shadow-outline">Remove Requirement
  </button>
  </div>
    );
}

export default RequirementForAdminCard;