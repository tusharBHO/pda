// app/(routes)/Database/components/Sidebar.jsx
import React from 'react'
import { useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react';
import { X } from "lucide-react";


const Sidebar = ({
    searchText,
    setSearchText,
    selectedRegions,
    setSelectedRegions,
    selectedUses,
    setSelectedUses,
    selectedCharacteristics,
    setSelectedCharacteristics,
}) => {
    // helper for checkbox toggle
    const handleToggle = (value, array, setArray) => {
        if (array.includes(value)) {
            setArray(array.filter(v => v !== value));
        } else {
            setArray([...array, value]);
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 rounded-sm sm:h-[90vh] h-fit overflow-y-auto">
            <div className="sticky top-0 space-y-4">
                <div className="mb-4">
                    <h1 className="text-4xl font-bold tracking-tight text-black">Breeds</h1>
                    <p className="mt-2 text-lg text-black ">
                        Explore a comprehensive list of breeds found across India.
                    </p>
                    <div className="relative mt-4">
                        <input
                            className="w-full pl-4 pr-4 py-2 rounded-lg bg-surface-light text-black placeholder:text-black border border-black focus:border-primary transition-shadow"
                            placeholder="Search for a specific breed..."
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-black">Filters</h2>
                    </div>
                    <div>
                        <button onClick={() => setSidebarOpen(true)}>
                            <ChevronDown className={`w-5 h-5 text-gray-700 ${sidebarOpen ? 'hidden' : 'block'}`} />
                        </button>
                        <button onClick={() => setSidebarOpen(false)}>
                            <X className={`w-5 h-5 text-gray-700 ${sidebarOpen ? 'block' : 'hidden'}`} />
                        </button>

                    </div>

                </div>

                <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'} space-y-6 pb-6 border-t border-gray-300 pt-4`}>
                    {/* Region Filter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Filter by Region</h3>
                        <div className="space-y-2 text-black">
                            {["North India", "South India", "Central India", "West India", "East India"].map(region => (
                                <label key={region} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegions.includes(region)}
                                        onChange={() =>
                                            handleToggle(region, selectedRegions, setSelectedRegions)
                                        }
                                    />
                                    <span className="ml-2 text-xs">{region}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Use Filter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Filter by Use</h3>
                        <div className="space-y-2 text-black">
                            {["Dairy", "Draught", "Dual-Purpose"].map(use => (
                                <label key={use} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedUses.includes(use)}
                                        onChange={() => handleToggle(use, selectedUses, setSelectedUses)}
                                    />
                                    <span className="ml-2 text-xs">{use}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Characteristics Filter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Filter by Characteristics</h3>
                        <div className="space-y-2 text-black">
                            {["High Milk Yield", "Disease Resistance"].map(trait => (
                                <label key={trait} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCharacteristics.includes(trait)}
                                        onChange={() =>
                                            handleToggle(trait, selectedCharacteristics, setSelectedCharacteristics)
                                        }
                                    />
                                    <span className="ml-2 text-xs">{trait}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar










// // app/(routes)/Database/components/Sidebar.jsx
// import React from 'react'

// const Sidebar = ({
//     searchText,
//     setSearchText,
//     selectedRegions,
//     setSelectedRegions,
//     selectedUses,
//     setSelectedUses,
//     selectedCharacteristics,
//     setSelectedCharacteristics,
// }) => {
//     // helper for checkbox toggle
//     const handleToggle = (value, array, setArray) => {
//         if (array.includes(value)) {
//             setArray(array.filter(v => v !== value));
//         } else {
//             setArray([...array, value]);
//         }
//     };

//     return (
//         <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 rounded-sm h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 space-y-4">
//                 <div className="mb-4">
//                     <h1 className="text-4xl font-bold tracking-tight text-black">Breeds</h1>
//                     <p className="mt-2 text-lg text-black ">
//                         Explore a comprehensive list of breeds found across India.
//                     </p>
//                     <div className="relative mt-4">
//                         <input
//                             className="w-full pl-4 pr-4 py-2 rounded-lg bg-surface-light text-black placeholder:text-black border border-black focus:border-primary transition-shadow"
//                             placeholder="Search for a specific breed..."
//                             type="text"
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Region Filter */}
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-black">Filter by Region</h3>
//                     <div className="space-y-2 text-black">
//                         {["North India", "South India", "Central India", "West India", "East India"].map(region => (
//                             <label key={region} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedRegions.includes(region)}
//                                     onChange={() =>
//                                         handleToggle(region, selectedRegions, setSelectedRegions)
//                                     }
//                                 />
//                                 <span className="ml-2 text-xs">{region}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Use Filter */}
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-black">Filter by Use</h3>
//                     <div className="space-y-2 text-black">
//                         {["Dairy", "Draught", "Dual-Purpose"].map(use => (
//                             <label key={use} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedUses.includes(use)}
//                                     onChange={() => handleToggle(use, selectedUses, setSelectedUses)}
//                                 />
//                                 <span className="ml-2 text-xs">{use}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Characteristics Filter */}
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-black">Filter by Characteristics</h3>
//                     <div className="space-y-2 text-black">
//                         {["High Milk Yield", "Disease Resistance"].map(trait => (
//                             <label key={trait} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCharacteristics.includes(trait)}
//                                     onChange={() =>
//                                         handleToggle(trait, selectedCharacteristics, setSelectedCharacteristics)
//                                     }
//                                 />
//                                 <span className="ml-2 text-xs">{trait}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar