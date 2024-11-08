import { StatsCardActionButton, SummaryCardProps } from '@/interfaces/ComponentInterfaces';
import React, {useState} from 'react'
import AppCard from './AppCard';
import { CardType, SpinnerType } from '@/enums/ComponentEnums';
import Spinner from '../feedbacks/Spinner';

const SummaryCard = ({title, actionButtons=null, loading, children}: SummaryCardProps) => {
    
    const [activeButton, setActiveButton] = useState(actionButtons ? actionButtons[actionButtons.length - 1].text : 0)

    const actionButtonPressed = (action: () => void, text: string) => {
        action();
        setActiveButton(text);
    }

    return (
        <div className='w-full'>
            <AppCard type={CardType.NOSHADOW}>
                <div className="h-[317px] flex flex-col justify-start gap-4 cursor-pointer">
                    <div className='flex justify-between items-center'>
                        <span className="text-sm font-satoshiBold text-accent-main">{title}</span>   
                        <div className='flex justify-between items-center gap-2'>
                            {actionButtons?.map((button: StatsCardActionButton) => <span onClick={() => actionButtonPressed(button.action, button.text)} className={`font-satoshiMedium text-xs cursor-pointer hover:bg-purple-lighter py-2 px-2 rounded text-accent-light hover:text-purple-main ${activeButton === button.text && `text-purple-main bg-purple-lighter`}`}>{button.text}</span>)}
                        </div>  
                    </div>

                    {loading ? <div className='h-full flex justify-center items-center'><Spinner type={SpinnerType.PRIMARY} /></div> : children}

                </div>
            </AppCard>
        </div>
    )
}

export default SummaryCard