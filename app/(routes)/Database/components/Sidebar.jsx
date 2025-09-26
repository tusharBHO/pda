import React from 'react'

const Sidebar = () => {
    return (
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 rounded-sm h-[90vh] overflow-y-auto">
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
                        />
                    </div>
                </div>

                {/* Filters */}
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-black">Filter by Region</h3>
                    <div className="space-y-2 text-black">
                        {["North India", "South India", "West India", "East India"].map(
                            (region) => (
                                <label key={region} className="flex items-center">
                                    <input
                                        className="h-3 w-3 rounded border-gray-300 text-black focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="ml-2 text-xs">{region}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-black">Filter by Use</h3>
                    <div className="space-y-2 text-black">
                        {["Dairy", "Draught", "Dual-Purpose"].map((use) => (
                            <label key={use} className="flex items-center">
                                <input
                                    className="h-3 w-3 rounded border-gray-300 text-black focus:ring-black"
                                    type="checkbox"
                                />
                                <span className="ml-2 text-xs">{use}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-black">Filter by Characteristics</h3>
                    <div className="space-y-2 text-black">
                        {["High Milk Yield", "Disease Resistance", "Heat Tolerant", "High Fat Content"].map(
                            (trait) => (
                                <label key={trait} className="flex items-center">
                                    <input
                                        className="h-3 w-3 rounded border-gray-300 text-black focus:ring-black"
                                        type="checkbox"
                                    />
                                    <span className="ml-2 text-xs">{trait}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
