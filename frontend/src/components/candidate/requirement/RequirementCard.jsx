import React from "react";
import { Link } from "react-router-dom";

const RequirementCard = ({requirement}) => {
    return (
      <Link
      to={`/candidate/requirement/detail/${requirement.requirementId}`}
      className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
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
    );
}

export default RequirementCard;