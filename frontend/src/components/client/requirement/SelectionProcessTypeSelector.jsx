import React, { useEffect, useState } from "react";

const CurrencyTypeSelector = ({handleRequirementInputChange, newRequirement}) => {
    const [currencyTypes] = useState([
        "INTERVIEW",
        "CV_SELECTION"
    ]);
    
    return (
        <>
            <div>
                <select 
                name="selectionProcessType" 
                className="block  px-3 py-2 mb-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00634D] focus:border-[#00634D] "
                id="selectionProcessType"
                value ={newRequirement.selectionProcessType}
                onChange={handleRequirementInputChange}
                >   
                    <option value={""}>Select Selection Process Type</option>
                    {currencyTypes.map((type,index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default CurrencyTypeSelector