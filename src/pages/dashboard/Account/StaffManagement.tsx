import React, { useState, useEffect } from 'react'
import { Table } from '../../../components/Table/Table2'
import { TeamMember } from '../../../utils/ProductList'
import { EditStaffModal, AddStaffModal } from '../../../components/Modal/StaffModal'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { UserService } from '../../../services/user'
import { useAuth } from '../../../zustand/auth.store'
import { generateSerialNumber } from '../../../utils/functions'
import Spinner from '../../../components/spinner/Spinner'
import { useMutation } from 'react-query';


export const StaffManagement = () => {
  const [staff, setStaff] = useState({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const profile: any = useAuth((s) => s.profile)

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {handleGetStaffs.mutate()}, [])

  const handleGetStaffs = useMutation(
    async () => {
      setLoading(true)
      return await UserService.getAllUsers({whiteLabelName: profile.whiteLabelName})
    },

    {
      onSuccess: (res) => {
        console.log(res);
        setLoading(false);
        setData(res?.data)
      },
      onError: (err: any) => {
        setLoading(false)
      }
    }
  );

  // const { data, isLoading, refetch } = useFetchWithParams(
  //   ["query-all-Staff-page", {
  //     // page: currentPage, limit: pageSize,
  //     whiteLabelName: profile.whiteLabelName
  //   }],
  //   UserService.getAllUsers,
  //   {
  //     onSuccess: (data: any) => {
  //       console.log("ResponseData", data);
  //       setLoading(false)
  //     },
  //     onError: (data: any) => {
  //       setLoading(false)
  //     },
  //     keepPreviousData: false,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: true,
  //   }
  // )

  // console.log(data)

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleViewAccountInfo = (row: any) => {
    setStaff(row)
    setIsEditModalOpen(true);
  }

  const handleAddStaffInfo = () => {
    setIsAddModalOpen(true);

  }

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };



  return (
    <div>
      <div className='flex flex-col gap-8 '>
        <div className='max-w-[350px] w-full'>
          <h2 className='text-base font-satoshiBold  font-semibold text-primary-text'>Team Members</h2>
          <p className='mt-2 text-sm font-satoshiRegular font-normal text-primary-subtext'>Invite your colleagues to work faster and collaborate together.</p>
          <div className='mt-4 flex gap-2'>
            <button className='border-[1px] whitespace-nowrap !border-[#470E81] px-4 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-primary-text text-center flex items-center gap-2'>
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
              className=' bg-[#470E81] whitespace-nowrap px-4 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-white '>

              Invite new member
            </button>

          </div>
        </div>

        {loading ? <div className='w-full flex justify-center items-center'><Spinner color={'#4B0082'} height={40} width={40}/></div> : <div className=' flex-grow w-auto overflow-x-auto'>
          {
            data && data?.result?.results.length > 0 ? (
              <>
                <Table data={data?.result.results}
                  hideActionName={true}
                  // rowActions={(row) => [
                  //   {
                  //     name: "View Account Info",
                  //     action: () => {
                  //       handleViewAccountInfo(row)
                  //     },
                  //   },
                  // ]}
                  clickRowAction={(row) => handleViewAccountInfo(row)}
                  columns={[
                    {
                      header: "S/N",
                      view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                        currentPage,
                        pageSize
                      })}</div>
                    },
                    {
                      header: "Staff",
                      view: (row: any) => <UserProfile url={row.image} name={`${row.firstName} ${row.lastName}`} email={row.email} />,
                    },
                    {
                      header: "Role/Permission",
                      view: (row: any) => <div>{row.role}</div>,
                    },
                    {
                      header: "Status",
                      view: (row: any) => row.blocked ? <span className='bg-[#cc0000] p-2 rounded-3xl text-[#fff]'>Blocked</span> : <span className='bg-[#00cc00] py-2 px-3 rounded-3xl text-[#fff]'>Active</span>,
                    },
                  ]}
                  loading={false}
                  pagination={
                    {
                      page: currentPage,
                      pageSize: pageSize,
                      totalRows: data?.result.totalResults,
                      setPageSize: handlePageSize,
                      setPage: handleCurrentPage
                    }
                  }

                />

              </>
            ) : (
              <div className='w-full flex flex-col justify-center items-center mt-8 sm:mt-0'>
                <img
                  src="/icons/no_team.svg"
                  className=""
                  alt="yep_logo"
                />
                <p className='mt-2 max-w-[500px] text-sm font-satoshiRegular font-normal text-center text-primary-subtext'>You haven't invited any staff members to the platform yet. You can invite coworkers to join and collaborate with you, and their information will be displayed here.</p>
              </div>

            )
          }
          <EditStaffModal staffInfo={staff} isOpen={isEditModalOpen} closeModal={async () => {
            await handleGetStaffs.mutate()
            closeEditModal()
          }} />
          <AddStaffModal isOpen={isAddModalOpen} closeModal={async () => {
            await handleGetStaffs.mutate()
            closeAddModal()
          }} />


        </div>}

      </div>
    </div>
  )
}



const UserProfile = ({ url, name, email }: any) => {
  return (
    <div className='flex gap-4 items-center '>
      <img className='h-10 w-10 ' alt='Employee ' src={url} />
      <div>
        <p className='font-satoshiMedium text-base text-primary-text'>{name}</p>
        <p className='text-sm text-primary-subtext mt-1'>{email}</p>
      </div>
    </div>
  )
}
