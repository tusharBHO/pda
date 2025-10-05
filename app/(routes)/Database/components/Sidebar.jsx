// New Version
// app/(routes)/Database/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // ← clean arrow icons
import Image from "next/image";

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
    const [isOpen, setIsOpen] = useState(false); // for mobile toggle
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggle = (value, array, setArray) => {
        if (array.includes(value)) {
            setArray(array.filter((v) => v !== value));
        } else {
            setArray([...array, value]);
        }
    };

    return (
        <aside className="w-full md:w-75 lg:w-80 flex-shrink-0 h-auto md:h-[88vh] overflow-y-auto 
      bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm rounded-xl p-4 
      transition-all duration-300">
            <div className="space-y-4">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Breeds</h1>
                    <p className="text-sm text-gray-600 mt-1 leading-snug">
                        Explore a comprehensive list of breeds found across India.
                    </p>

                    <div className="relative mt-3">
                        <input
                            className="w-full px-3 py-1.5 rounded-md bg-gray-50 border border-gray-300 
             focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 
             text-gray-800 placeholder:text-gray-500 text-sm transition-all"
                            placeholder="Search breeds..."
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters Toggle Button (mobile only) */}
                {isMobile && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 
            text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-300"
                    >
                        <span>Filters</span>
                        {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                )}

                {/* Collapsible Filter Section */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isMobile
                        ? isOpen
                            ? "max-h-[1000px] opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        : "max-h-[1000px] opacity-100 mt-2" // always open on desktop
                        }`}
                >
                    <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2 shadow-inner">
                        {/* Region Filter */}
                        <div>
                            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                                Filter by Region
                            </h3>
                            <div className="space-y-1 text-gray-800">
                                {["North India", "South India", "Central India", "West India", "East India"].map((region) => (
                                    <label key={region} className="flex items-center hover:bg-gray-100 px-2 py-0.5 rounded-md transition">
                                        <input
                                            type="checkbox"
                                            checked={selectedRegions.includes(region)}
                                            onChange={() => handleToggle(region, selectedRegions, setSelectedRegions)}
                                            className="h-3.5 w-3.5 accent-blue-600 rounded-sm"
                                        />
                                        <span className="ml-2 text-sm">{region}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Use Filter */}
                        <div>
                            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                                Filter by Use
                            </h3>
                            <div className="space-y-1 text-gray-800">
                                {["Dairy", "Draught", "Dual-Purpose"].map((use) => (
                                    <label key={use} className="flex items-center hover:bg-gray-100 px-2 py-0.5 rounded-md transition">
                                        <input
                                            type="checkbox"
                                            checked={selectedUses.includes(use)}
                                            onChange={() => handleToggle(use, selectedUses, setSelectedUses)}
                                            className="h-3.5 w-3.5 accent-blue-600 rounded-sm"
                                        />
                                        <span className="ml-2 text-[14px]">{use}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Characteristics Filter */}
                        <div>
                            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                                Filter by Characteristics
                            </h3>
                            <div className="space-y-1 text-gray-800">
                                {["High Milk Yield", "Disease Resistance"].map((trait) => (
                                    <label key={trait} className="flex items-center hover:bg-gray-100 px-2 py-0.5 rounded-md transition">
                                        <input
                                            type="checkbox"
                                            checked={selectedCharacteristics.includes(trait)}
                                            onChange={() => handleToggle(trait, selectedCharacteristics, setSelectedCharacteristics)}
                                            className="h-3.5 w-3.5 accent-blue-600 rounded-sm"
                                        />
                                        <span className="ml-2 text-[14px]">{trait}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
