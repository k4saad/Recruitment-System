import React from "react";
import moment from "moment";

const RequirementInterviewCard = ({interview}) => {

    const startInterview = () => {
        window.open(`/interview/join/?roomID=${interview.meetingId}`);
    }
    return (
        <div
            className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
                <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
                {interview.organizationName}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg ">
                Applicant Id : {interview.applicationId}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg ">
                Post Applied for : {interview.requirementTitle}
                </p>
                <p className="m-3 font-LakesNeueRegular text-lg">
                {interview.interviewTimestamp ? (
                            interview.status === 'SCHEDULED' ? (
                            <>Interview Scheduled for : {moment(interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}</>
                            ) : interview.status === 'COMPLETED' ? (
                            <>Interview : Completed</>
                            ) : interview.status === 'CANCELLED' ? (
                            <>Interview : Cancelled</>
                            ) : interview.status === 'ONGOING' ? (
                                <>Interview : Ongoing</>
                                
                            ) : (
                            <>Status Unknown</>
                            )
                        ) : (
                            <>Not Scheduled</>
                        )}
                </p>
                {
                    interview.status === "ONGOING"
                    &&
                    <button
                        onClick={startInterview}
                        className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                            text-white font-bold py-2 px-4 my-5 focus:outline-none mx-auto
                            focus:shadow-outline">Join Interview
                    </button>
                }
            </div>

    );
}

export default RequirementInterviewCard;