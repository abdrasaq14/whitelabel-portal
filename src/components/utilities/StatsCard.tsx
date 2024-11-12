"use client"
import { CardType, SpinnerType } from '@/enums/ComponentEnums'
import React, {useState} from 'react'
import AppCard from './AppCard'
import { StatsCardProps, StatsCardActionButton } from '@/interfaces/ComponentInterfaces'
import Spinner from '../feedbacks/Spinner'

const StatsCard = ({title, icon, value, actionButtons=null, loading}: StatsCardProps) => {
    const [activeButton, setActiveButton] = useState(actionButtons ? actionButtons[actionButtons.length - 1].text : 0)

    const actionButtonPressed = (action: () => void, text: string) => {
        action();
        setActiveButton(text);
    }

    return (
        <div className='w-full'>
            <AppCard type={CardType.NOSHADOW}>
                <div className="h-[107px] flex flex-col justify-start gap-4 group cursor-pointer">
                    <div className='flex justify-between items-center'>
                    <span className="text-xs font-satoshi text-[#000000]">{title}</span>
                    {icon}
                    </div>

                    {loading ? <Spinner type={SpinnerType.PRIMARY} /> : <span className="text-[#000000] text-[#2b2c34] text-xl font-gooperSemibold transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 duration-300">{value}</span>}

                    <div className='flex justify-between items-center'>
                        {actionButtons?.map((button: StatsCardActionButton, index: number) => <span key={index} onClick={() => actionButtonPressed(button.action, button.text)} className={`font-satoshiMedium text-xs cursor-pointer hover:bg-purple-lighter py-2 px-2 rounded text-accent-light hover:text-purple-main ${activeButton === button.text && `text-purple-main bg-purple-lighter`}`}>{button.text}</span>)}
                    </div>
                </div>
            </AppCard>
        </div>
    )
}

export default StatsCard