import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useOnClickOutside from '../../hooks/useClickOutside';
import { MdFilterList } from "react-icons/md";

interface Option {
  id: number;
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  name: string;
  onSelect?: (option: Option[]) => void,
  isMulti?: boolean
}

const Select: React.FC<SelectProps> = ({ options, name, onSelect = (f) => f, isMulti = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<any>()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleOption = (option: Option) => {
    const index = selectedOptions.findIndex((opt) => opt.id === option.id);

    if (index === -1) {
      // Option not found: Add it
      const newOptions = isMulti
        ? [...selectedOptions, option] // Multi-select: Append the new option
        : [option]; // Single-select: Replace with the new option

      setSelectedOptions(newOptions);
      onSelect(newOptions);
    } else {
      // Option found: Remove it (only for multi-select)
      if (isMulti) {
        const updatedOptions = selectedOptions.filter((_, i) => i !== index);
        setSelectedOptions(updatedOptions);
        onSelect(updatedOptions);
      } else {
        // Single select: Deselect the option
        setSelectedOptions([]);
        onSelect([]);
      }
    }

    // Close the dropdown regardless of selection
    setIsOpen(false);
  };


  const handleTagRemove = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== option.id));
    onSelect(selectedOptions.filter((opt) => opt.id !== option.id))
  };

  useOnClickOutside(inputRef, () => {
    setIsOpen(false)
  })

  return (
    <div ref={inputRef} className="w-full relative">

      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center my-1 rounded px-3 py-2 gap-2 mx-auto w-full border border-primary'><MdFilterList /> {name}</button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full mx-auto px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}


          />
          {options
            .filter((option) =>
              option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => toggleOption(option)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
      <div className="flex flex-wrap mt-2">
        {selectedOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center text-sm px-3 py-1 mr-2 mb-2 bg-gray-500 text-white rounded"
          >
            {option.label}
            <AiOutlineClose
              className="ml-1 cursor-pointer"
              onClick={() => handleTagRemove(option)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage
// const options: Option[] = [
//   { id: 1, label: 'Option 1' },
//   { id: 2, label: 'Option 2' },
//   { id: 3, label: 'Option 3' },
//   { id: 4, label: 'Option 4' },
// ];

// const App: React.FC = () => {
//   return (
//     <div className="p-4">
//       <Select options={options} />
//     </div>
//   );
// };

export default Select;
