import React from 'react'
import { Field, useField } from 'formik'

export const CheckboxInput = ({ disabled, name, value, defualt }: any) => {
  const [field, meta, helpers] = useField(name);
  return (
    <div>
      <label htmlFor="checkboxOption" className={`flex text-sm font-normal font-satoshiRegular items-center
                ${disabled ? ' cursor-not-allowed text-primary-subtext bg-pri ' : 'text-primary'}
                    `}>
        <Field
          type="checkbox"
          id="checkboxOption"
          checked={defualt}
          name={name}
          className="mr-2 border disabled:bg-primary disabled:!accent-primary !accent-primary rounded-sm outline-none"
          disabled={disabled}
        />
        {value}
      </label>
    </div>
  )
}

export const SelectInput = ({ disabled, values, label, name, selectInputClass }: any) => {
  const [field, meta, helpers] = useField(name);
  return (

    <>
      <label htmlFor={name} className='text-sm font-normal font-satoshiRegular text-[#344054]'>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        className={`bg-[#C8CCD0] border-[1px]  border-[#CACACA] px-4 text-sm text-[#515151]  rounded-md py-2 mt-2
            ${selectInputClass}
            ${disabled ? 'cursor-not-allowed ' : ''}
          `}
        disabled={disabled}
      >
        {values.map((value: any) => (
          <option value={value.value} key={value.value} className="text-sm">{value.label}</option>
        ))}
      </Field>
    </>

  )
}


