
import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
  optionClass?: string;
}

interface Props {
  options: Option[];
  onSelectChange: (selectedValue: string) => void;
  containerClass?: string;
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'red' : 'white',
    color: state.isSelected ? 'white' : '#4B5563',
    cursor: 'pointer',
  }),
};

const SelectDropdown: React.FC<Props> = ({ options, onSelectChange, containerClass }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select
      onChange={handleChange}
      className={`bg-transparent w-[80%] mx-auto  rounded-md py-2 mt-2 ${containerClass} ${customStyles}}`}
    >
     
      {options.map((option) => (
        <option key={option.value} value={option.value}  className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
