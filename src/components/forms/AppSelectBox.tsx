import { ReactElement, useState } from 'react';
import '@/app/styles/components.css'
import { AppSelectBoxProps } from '@/interfaces/ComponentInterfaces';

/**
 * Renders a customised textbox
 * 
 * @remarks
 * AppTextBox component, reusable throughout the app.
 * 
 * 
 * @param {AppTextBoxProps} props
 * 
 * 
 * Prop Details
 * 
 * ```
 * 
 * {
 * 
 *  leftIcon: Any valid react-icon. Displays on left-side of textbox,
 * 
 *  rightIcon: Any valid react-icon, displays on right-side of textbox,
 * 
 *  placeholder: Placeholder of textbox,
 * 
 *  topLabel: Displayed ontop of textbox. Takes text or a component,
 * 
 *  bottomLabel: Displayed beneath textbox. Takes text or a component,
 * 
 *  type: Type of textbox - TextboxType.NUMBER, TextboxType.TEXT, TextboxType.PASSWORD,
 * 
 *  disabled: Disable text box or not (true or false)
 *
 * }
 * 
 * ```
 * 
 * Usage
 * 
 * <span style="color: cyan; font-size: 12px;">Note: Wrap the AppTextBox into a div. It takes the width of the div</span>
 * 
 * ```tsx
 * import AppTextBox from "@/components/AppTextBox";
 * import { TextboxType } from "@/enums/ComponentEnums";
 * import { FaArrowRight } from "react-icons/fa6";
 * import {FaRegEnvelope} from "react-icons/fa6";
 * import { AiOutlineEyeInvisible } from "react-icons/ai";
 * 
 * <div className="w-[200px]">
 * <AppTextBox
 * leftIcon={FaRegEnvelope} 
 * rightIcon={FaArrowRight} 
 * topLabel={<div className="flex justify-between items-center"><span>Username</span><AiOutlineEyeInvisible/></div>}
 * bottomLabel={<div className="flex justify-between items-center"><span className="text-danger-main">Username already exists</span></div>} 
 * placeholder="Email Address"
 * type={TextboxType.PASSWORD}
 * />
 * </div>
 * ```
 * 
 * The props type is defined as a separate interface **which must be exported!**
 * 
 * ```
 * export interface AppTextBoxProps {
 *    // ...
 * }
 * 
 * const AppTextBox = ({leftIcon: LeftIcon=null, rightIcon: RightIcon=null, placeholder, topLabel: TopLabel=null, bottomLabel: BottomLabel=null, type, disabled=false}: AppTextBoxProps): ReactElement => {
 *     // ...
 * }
 * 
 * export default AppTextBox
 * 
 * ```
 * 
 * 
 * @returns {ReactElement} AppTextBox - Customized JSX textbox.
 */

const AppSelectBox = ({topLabel: TopLabel=null, bottomLabel: BottomLabel=null, disabled=false, name, value, onChange, onBlur, children}: AppSelectBoxProps): ReactElement => {
    
    return (
        <>
            {TopLabel && typeof TopLabel === "string" ? <span className="input-label">{TopLabel}</span> : TopLabel}
            <div className="input-wrapper">
                <select className='input-box' name={name} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
                    {children}
                </select>
            </div>
            {BottomLabel && typeof BottomLabel === "string" ? <span className="input-label">{BottomLabel}</span> : BottomLabel}
        </>
    )
}

export default AppSelectBox