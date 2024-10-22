import { ButtonProps } from '@/interfaces/ComponentInterfaces'
import '@/app/styles/components.css'
import { ButtonType } from '@/enums/ComponentEnums'
import { ReactElement } from 'react'

/**
 * Renders a customised button
 * 
 * @remarks
 * AppButton component, reusable throughout the app.
 * 
 * 
 * @param {ButtonProps} props
 * 
 * 
 * Prop Details
 * 
 * ```
 * 
 * {
 * 
 *  type: Classname of button - ButtonType.PRIMARY, ButtonType.SECONDARY, ButtonType.DISABLED,
 * 
 *  icon: Any valid react-icon,
 * 
 *  style: Additional user defined styles,
 * 
 *  text: Text to display on the button
 *
 * }
 * 
 * ```
 * 
 * Usage
 * 
 * <span style="color: cyan; font-size: 12px;">Note: Wrap the AppButton into a div. It takes the width of the div</span>
 * 
 * ```tsx
 * import { ButtonType } from "@/enums/ComponentEnums";
 * 
 * const handleClick = () => console.log("Clicked")
 * 
 * <div className="w-[200px]"><AppButton type={ButtonType.DISABLED} text="Proceed" style="w-48" icon={FaArrowRight} handleClick={handleClick}/></div>
 * ```
 * 
 * The props type is defined as a separate interface **which must be exported!**
 * 
 * ```
 * export interface ButtonProps {
 *    // ...
 * }
 * 
 * const AppButton = ({type, icon: Icon=null, style=null, text, handleClick}: ButtonProps): ReactElement {
 *     // ...
 * }
 * 
 * export default AppButton
 * 
 * ```
 * 
 * 
 * @returns {ReactElement} AppButton - Customized JSX button.
 */

const AppButton = ({type, icon: Icon=null, style=null, text, handleClick}: ButtonProps): ReactElement => {
  return (
    <button type="submit" onClick={() => type !== ButtonType.DISABLED && handleClick()} className={`btn ${type} font-latoRegular ${style}`}>{Icon ? <>{text} <Icon size={14} /></> : text}</button>
  )
}

export default AppButton