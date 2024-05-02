import React, {useState} from 'react'
import { Table } from '../../../components/Table/Table2'
import { TeamMember } from '../../../utils/ProductList'
import { EditStaffModal, AddStaffModal } from '../../../components/Modal/StaffModal'



export const StaffManagement = () => {
  const [staff, setStaff] = useState({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const closeAddModal = () => {
      setIsAddModalOpen(false);
    };
  

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  
  const handleViewAccountInfo = (row: any) => {
    setStaff(row)
  setIsEditModalOpen(true);
  }
  const handleAddStaffInfo = () =>{
    setIsAddModalOpen(true);
  }

 

 
  return (
    <div>
         <div className='flex flex-wrap gap-8 '>
            <div className='max-w-[300px] w-full'>
                <h2 className='text-base font-satoshiBold  font-semibold text-primary-text'>Team Members</h2>
                <p className='mt-2 text-sm font-satoshiRegular font-normal text-primary-subtext'>Invite your colleagues to work faster and collaborate together.</p>
                <div className='mt-4 flex gap-2'>
                <button className='border-[1px] !border-[#470E81] px-4 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-primary-text text-center flex items-center gap-2'>
                    <img
                        src="/icons/export.svg"
                        className="w-5 h-5"
                         alt="upload_icon"
                        />
                    Export CSV
                    </button>
                    <button 
                    type='button'
                    onClick={handleAddStaffInfo}
                    className=' bg-[#470E81] px-4 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-white '>
        
                    Invite new member
                    </button>

                </div>  
            </div>
            
            <div className=' flex-grow w-auto overflow-x-auto'>
                {
                    TeamMember.data.length > 0 ? (
                      <>
                       <Table data={TeamMember?.data}
                        hideActionName={true}
                          rowActions={(row) => [
                            {
                              name: "View Account Info",
                              action: () => {
                                handleViewAccountInfo(row)
                               },
                            },
                            {
                              name: "Suspend Account",
                              action: () => { 
                                handleViewAccountInfo(row)
                              },
                            },
                            {
                                name: "Change Account Permission",
                                action: () => { 
                                  handleViewAccountInfo(row)
                                },
                              },
                          ]}
                          columns={[
                            {
                              header: "S/N",
                              view: (row: any) => <div className="pc-text-blue">{row.id}</div>
                            },
                            {
                                header: "Staff",
                                view: (row: any) => <UserProfile url={row.avatar_url} name={row.name} email={row.email} />,
                              },
                            {
                              header: "Role/Permission",
                              view: (row: any) => <div>{row.role}</div>,
                            },
                           
                       
                           
                          ]}
                          loading={false}
                          pagination={TeamMember.pagination}
          
                        />
                        <EditStaffModal staffInfo={staff} isOpen={isEditModalOpen} closeModal={closeEditModal} />
                        <AddStaffModal  isOpen={isAddModalOpen} closeModal={closeAddModal} />
                      
                      </>
                       
                    ):(
                        <div className='max-w-[500px] flex flex-col justify-center mt-8 sm:mt-0 items-center '>
                              <img
                                    src="/icons/no_team.svg"
                                    className=""
                                    alt="yep_logo"
                                />
                                <p className='mt-2 text-sm font-satoshiRegular font-normal text-center text-primary-subtext'>You haven't invited any staff members to the platform yet. You can invite coworkers to join and collaborate with you, and their information will be displayed here.</p>
                        </div>

                    )
                }
          
            </div>
            
        </div>
    </div>
  )
}


const UserProfile = ({url, name, email}: any) => {
    return (
        <div className='flex gap-4 items-center '>
                    <img alt='Employee ' src={url}/>
                        <div>
                        <p className='font-satoshiMedium text-base text-primary-text'>{name}</p>
                        <p className='text-sm text-primary-subtext mt-1'>{email}</p>
                    </div>
                </div>
    )
}
