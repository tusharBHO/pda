// app/(routes)/Database/components/Sidebar.jsx
"use client";
import { X } from "lucide-react";
import { useState } from "react";

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggle = (value, array, setArray) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const clearAll = () => {
    setSelectedRegions([]);
    setSelectedUses([]);
    setSelectedCharacteristics([]);
  };

  const hasFilters =
    selectedRegions.length ||
    selectedUses.length ||
    selectedCharacteristics.length;

  return (
    <div className="w-full md:w-72 lg:w-80 flex-shrink-0 h-auto md:h-[88vh] overflow-y-auto bg-secondary border border-theme rounded-xl p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <p className="text-sm opacity-70">
          Narrow down breeds quickly
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* ACTIVE FILTERS */}
      {hasFilters && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {[...selectedRegions, ...selectedUses, ...selectedCharacteristics].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs bg-primary/10 px-2 py-1 rounded"
              >
                {item}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedRegions.includes(item))
                      setSelectedRegions(selectedRegions.filter((r) => r !== item));
                    else if (selectedUses.includes(item))
                      setSelectedUses(selectedUses.filter((u) => u !== item));
                    else
                      setSelectedCharacteristics(
                        selectedCharacteristics.filter((c) => c !== item)
                      );
                  }}
                />
              </span>
            ))}
          </div>

          <button
            onClick={clearAll}
            className="text-xs text-red-500 mt-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* FILTER GROUP */}
      <FilterGroup
        title="Region"
        options={["North India", "South India", "Central India", "West India", "East India"]}
        selected={selectedRegions}
        setSelected={setSelectedRegions}
        handleToggle={handleToggle}
      />

      <FilterGroup
        title="Use"
        options={["Dairy", "Draught", "Dual-Purpose"]}
        selected={selectedUses}
        setSelected={setSelectedUses}
        handleToggle={handleToggle}
      />

      <FilterGroup
        title="Characteristics"
        options={["High Milk Yield", "Disease Resistance"]}
        selected={selectedCharacteristics}
        setSelected={setSelectedCharacteristics}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default Sidebar;


/* ================= COMPONENT ================= */

const FilterGroup = ({ title, options, selected, setSelected, handleToggle }) => {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>

      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-primary/10 px-2 py-1 rounded"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option, selected, setSelected)}
              className="accent-primary"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};