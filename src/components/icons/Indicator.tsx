import React from 'react'

const Indicator = () => {
  
    return (

        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_9052_160311)">
                <circle cx="8" cy="8" r="4" fill="#D42620"/>
            </g>
            <defs>
                <filter id="filter0_d_9052_160311" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_9052_160311"/>
                    <feOffset/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.857113 0 0 0 0 0.34189 0 0 0 0 0.324124 0 0 0 0.19 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9052_160311"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9052_160311" result="shape"/>
                </filter>
            </defs>
        </svg>

    )

}

export default Indicator