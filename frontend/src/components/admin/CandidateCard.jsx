import React from "react";
import { Link } from "react-router-dom";

const CandidateCard = ({candidate, deleteCandidate}) => {
    return (
      <div
      className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5"
      >
      <Link
      to={`/admin/candidate/detail/${candidate.candidateId}`}
      state={{candidate}}
      >
        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
          {candidate.name}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Id : {candidate.candidateId}
        </p>
      </Link>
      <button
      onClick={deleteCandidate}
      className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
          text-white font-bold py-2 px-4 my-5 focus:outline-none mx-auto
          focus:shadow-outline">Remove Candidate
  </button>
  </div>
    );
}

export default CandidateCard;