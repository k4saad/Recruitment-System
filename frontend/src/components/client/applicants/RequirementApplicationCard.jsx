import React from "react";
import { Link } from "react-router-dom";

const RequirementApplicationCard = ({requirement}) => {
    return (
        <>
            {
                requirement.numberOfApplicants > 0 &&
                (
                    <Link
                    to={`/client/applicants/requirements/${requirement.requirementId}`}
                    className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
                        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
                        {requirement.title}
                        </p>
                        <p className="m-3 font-LakesNeueRegular text-lg">
                        Status : {requirement.status}
                        </p>
                        <p className="m-3 font-LakesNeueRegular text-lg">
                        Salary : {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}
                        </p>
                        <p className="m-3 font-LakesNeueRegular text-lg ">
                        Applicants : {requirement.numberOfApplicants}
                        </p>
                    </Link>
                )
            }
        </>
    );
}

export default RequirementApplicationCard;