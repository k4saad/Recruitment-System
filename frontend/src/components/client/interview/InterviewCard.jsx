import React from "react";
import { Link } from "react-router-dom";

const RequirementInterviewCard = ({interview}) => {

    const startInterview = () => {

    }
    return (
        <div
            className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
                <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
                {interview.candidateName}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg ">
                Applicant Id : {interview.applicationId}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg ">
                Post Applied for : {interview.requirementTitle}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg">
                Interview : {interview.interviewTimestamp ? (
                            interview.status === 'SCHEDULED' ? (
                            <>Scheduled for: {moment(interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}</>
                            ) : interview.status === 'COMPLETED' ? (
                            <>Completed</>
                            ) : interview.status === 'CANCELLED' ? (
                            <>Cancelled</>
                            ) : (
                            <>Status Unknown</>
                            )
                        ) : (
                            <>Not Scheduled</>
                        )}
                </p>
                <button
                    onClick={startInterview}
                    className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                        text-white font-bold py-2 px-4  focus:outline-none mx-auto
                        focus:shadow-outline">Start Interview
                </button>
                
            </div>

    );
}

export default RequirementInterviewCard;