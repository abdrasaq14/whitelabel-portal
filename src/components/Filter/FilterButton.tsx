import React from "react";

import { MdFilterList } from "react-icons/md";

function FilterButton({ setShowFilter }: { setShowFilter: (value: boolean) => void }) {
  return (
    <button
      onClick={() => setShowFilter(true)}
      className="px-3 py-2 border border-accent-darker text-accent-darker hover:text-white hover:bg-purple-main rounded text-sm flex items-center gap-2"
    >
      <MdFilterList /> Filter
    </button>
  );
}

export default FilterButton;
