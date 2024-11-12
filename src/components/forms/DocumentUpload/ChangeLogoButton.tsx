import Spinner from '@/components/feedbacks/Spinner'
import GalleryAddIcon from '@/components/icons/GalleryAddIcon'
import { ChangeLogoButtonProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'

const ChangeLogoButton = ({loader=null}: ChangeLogoButtonProps) => {
  return (
    <label htmlFor="file-upload" className="btn btn-secondary cursor-pointer">
        {loader?.loading ? <><Spinner type={loader?.type} height={loader?.height} width={loader?.width} /><span>Uploading</span></> : <><GalleryAddIcon /><span>Change Logo</span></>}
    </label>
  )
}

export default ChangeLogoButton