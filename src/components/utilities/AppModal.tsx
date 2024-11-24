import React, {} from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { AppModalProps } from '@/interfaces/ComponentInterfaces'
import '@/app/styles/components.css'
import AppButton from '../forms/AppButton'
import { MdCancel } from "react-icons/md";
import { ModalType } from '@/enums/ComponentEnums'

const AppModal = ({header=null, footer=null, hasClose=false, children, isOpen=false, closeClicked, style=``, type=ModalType.DEFAULT}: AppModalProps) => {
    
  return (
    <Dialog open={isOpen} onClose={(isOpen) => {}} className="relative z-10">
      
      <DialogBackdrop transition className="modal-backdrop"/>

      <div className="fixed inset-0 z-10 w-screen overflow-none">
        <div className={type}>
          <DialogPanel
            transition
            className="dialog-panel"
          >
            <div className={`bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ${style}`}>
              {hasClose && <div className="flex justify-end items-center"><MdCancel className="text-accent-main cursor-pointer" size={20} onClick={closeClicked}/></div>}
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className={header?.type}>
                    <DialogTitle as="h3" className="dialog-title">
                      {header?.title}
                    </DialogTitle>
                    <Description className="dialog-subtitle">{header?.subtitle}</Description>
                  </div>
                  <div className="mt-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            {footer && <div className={`px-4 py-3 sm:flex sm:px-6 gap-4 ${footer?.type}`}>
                <div className="w-[100px]"><AppButton type={footer.cancelButton.type} text={footer.cancelButton.text} icon={footer.cancelButton.icon} handleClick={footer.cancelButton.handleClick}/></div>
                <div className="w-[100px]"><AppButton type={footer.submitButton.type} text={footer.submitButton.text} icon={footer.submitButton.icon} handleClick={footer.submitButton.handleClick}/></div>
            </div>}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AppModal