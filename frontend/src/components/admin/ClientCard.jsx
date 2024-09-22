import React from "react";
import { Link } from "react-router-dom";

const ClientCard = ({client}) => {
    return (
      <Link
      to={`/admin/client/detail/${client.clientId}`}
      state={{client}}
      className="flex flex-col border-4 hover:ring-4 ring-[#00634D] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5">
        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
          {client.name}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Company : {client.organizationName}
        </p>
      </Link>
    );
}

export default ClientCard;