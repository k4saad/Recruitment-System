import React from "react";
import { Link } from "react-router-dom";

const RequirementApplicationCard = ({applicant}) => {

    return (
            <Link
            to={`/client/applicants/detail/${applicant.applicationId}`}
            className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
                <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
                {applicant.applicantName}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg ">
                Applicant Id : {applicant.applicationId}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg">
                Status : {applicant.status}
                </p>
            </Link>
    );
}

export default RequirementApplicationCard;