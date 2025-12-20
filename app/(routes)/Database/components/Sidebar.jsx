// Theme-Update
"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (value, array, setArray) => {
    if (array.includes(value)) setArray(array.filter((v) => v !== value));
    else setArray([...array, value]);
  };

  return (
    <aside className="w-full md:w-75 lg:w-80 flex-shrink-0 h-auto md:h-[88vh] overflow-y-auto bg-secondary border border-theme rounded-xl p-4 transition-theme">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-theme">Breeds</h1>
          <p className="text-sm text-theme/70 mt-1 leading-snug">
            Explore a comprehensive list of breeds found across India.
          </p>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-secondary border border-theme text-theme placeholder:text-theme/50 text-sm transition-theme focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Mobile Toggle */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-secondary hover:bg-primary/10 text-theme font-medium py-2 px-4 rounded-md shadow-theme transition-theme"
          >
            <span>Filters</span>
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}

        {/* Filter Section */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isMobile ? (isOpen ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0") : "max-h-[1000px] opacity-100 mt-2"
          }`}
        >
          <div className="space-y-3 p-3 rounded-lg border border-theme bg-secondary shadow-inner transition-theme">
            {/* Region Filter */}
            <div>
              <h3 className="text-[15px] font-semibold text-theme mb-1">Filter by Region</h3>
              <div className="space-y-1">
                {["North India","South India","Central India","West India","East India"].map(region => (
                  <label key={region} className="flex items-center px-2 py-0.5 rounded-md hover:bg-primary/10 text-theme transition-theme">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => handleToggle(region, selectedRegions, setSelectedRegions)}
                      className="h-3.5 w-3.5 accent-primary rounded-sm"
                    />
                    <span className="ml-2 text-sm">{region}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Use Filter */}
            <div>
              <h3 className="text-[15px] font-semibold text-theme mb-1">Filter by Use</h3>
              <div className="space-y-1">
                {["Dairy","Draught","Dual-Purpose"].map(use => (
                  <label key={use} className="flex items-center px-2 py-0.5 rounded-md hover:bg-primary/10 text-theme transition-theme">
                    <input
                      type="checkbox"
                      checked={selectedUses.includes(use)}
                      onChange={() => handleToggle(use, selectedUses, setSelectedUses)}
                      className="h-3.5 w-3.5 accent-primary rounded-sm"
                    />
                    <span className="ml-2 text-[14px]">{use}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Characteristics Filter */}
            <div>
              <h3 className="text-[15px] font-semibold text-theme mb-1">Filter by Characteristics</h3>
              <div className="space-y-1">
                {["High Milk Yield","Disease Resistance"].map(trait => (
                  <label key={trait} className="flex items-center px-2 py-0.5 rounded-md hover:bg-primary/10 text-theme transition-theme">
                    <input
                      type="checkbox"
                      checked={selectedCharacteristics.includes(trait)}
                      onChange={() => handleToggle(trait, selectedCharacteristics, setSelectedCharacteristics)}
                      className="h-3.5 w-3.5 accent-primary rounded-sm"
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