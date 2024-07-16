import React from 'react'
import { Field, useField }from 'formik'

const RadioInput = ({ disabled, name,value }: any) => {
    const [field] = useField(name);
  return (
    <div className='w-full  flex justify-between'>
    <label htmlFor={value} className={ `flex text-sm font-medium border-gray-600 border-[1.5px] p-2 rounded-md font-satoshiMedium items-center w-full justify-between
            ${disabled ? ' cursor-not-allowed text-primary-subtext ' : 'text-primary-text'}
                `}>
             {value}
             <Field
                  type="radio"
                     id={value}
                     checked={true}
                     className="mr-2 border-none rounded-sm outline-none  p-2 cursor-pointer checked:bg-primary"
                     disabled={disabled}
                     {...field}
  
                     />
                    
         </label>
</div>
  )
}

export default RadioInput