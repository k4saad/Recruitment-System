import React from "react";
import { Link } from "react-router-dom";

const AllApplication = ({application}) => {
    return (
      <Link
      to={`/candidate/application/detail/${application.applicationId}`}
      className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
          {application.clientRequirementTitle}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Company : {application.clientRequirementOrganizationName}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg ">
          Status : {application.candidateApplicationStatus}
        </p>
      </Link>
    );
}

export default AllApplication;