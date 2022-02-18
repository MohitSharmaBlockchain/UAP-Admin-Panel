import { ArrowRightRounded } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AdminModal } from './AdminModal'
import { Button } from 'react-bootstrap'
// import { useSelector } from 'react-redux'

export const AdminsEdit = ({ logoutAdminUser }) => {
    const [adminData, setAdminData] = useState(null)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('ADMIN')
    // const [superAdminData, setSuperAdminData] = useState(null)
    // const alterAdmins = useSelector((state) => state.alterAdmins)
    // const { adminAction } = <alte></alte>rAdmins

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`http://localhost:4000/admin/getAllAdmin`)
                .then((res) => {
                    // console.log(res.data)
                    setAdminData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getData()
    }, [open])

    return (
        <div className='third p-0 pt-[10px] wallet h-screen'>
            <div className='top__box__container'>
                <Button variant='primary' onClick={(e) => logoutAdminUser(e)}>
                    Logout
                </Button>{' '}
            </div>
            <hr />
            <div className='cardWrapper flex-col mt-4 flex flex-wrap gap-x-3 gap-y-5 justify-center pb-20'>
                <div className='CardsContainer flex flex-col items-center justify-between px-8 screen1:px-4 screen10:px-2'>
                    <AdminInfo
                        count1={
                            adminData && adminData.data
                                ? adminData.data.length
                                : 0
                        }
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
                <div className='User tableBox w-full px-8 pb-10 screen1:px-4 flex flex-col items-center justify-center mt-10 mx-auto screen7:px-3 screen10:px-2'>
                    <div className='adminSwitch flex items-center gap-x-2 h-10 mb-10 select-none'>
                        <div
                            className='selectOption px-1 rounded-sm h-full flex items-center justify-center cursor-pointer'
                            style={{
                                borderBottom:
                                    active === 'ADMIN'
                                        ? '4px solid #1370f1bf'
                                        : '',
                            }}
                            onClick={() => setActive('ADMIN')}
                        >
                            <span className='font-semibold'>ADMINS</span>
                        </div>
                        {/* <div
                            className='selectOption px-1 rounded-sm pb-1 h-full flex items-center justify-center cursor-pointer'
                            style={{
                                borderBottom:
                                    active === 'SUPER_ADMIN'
                                        ? '4px solid #1370f1bf'
                                        : '',
                            }}
                            onClick={() => setActive('SUPER_ADMIN')}
                        >
                            <span className='font-semibold'>SUPER-ADMINS</span>
                        </div> */}
                    </div>
                    {active === 'ADMIN' && (
                        <AdminTable
                            data={adminData ? adminData.data : []}
                            msg={adminData ? adminData.msg : ''}
                        />
                    )}
                    {/* {active === 'SUPER_ADMIN' && (
                        <AdminTable data={superAdminData} />
                    )} */}
                </div>
            </div>
        </div>
    )
}

const AdminTable = ({ data, msg }) => {
    return (
        <>
            <table className='w-full table-auto rounded-lg shadow-lg block'>
                <thead>
                    <tr>
                        <th className='px-4 py-2 w-44 text-left rounded-tl-md'>
                            Sr No.
                        </th>
                        <th className='px-4 py-2 w-96 text-left'>Email ID</th>
                        <th className='px-4 py-2 w-96 text-left'>
                            Admin Verified
                        </th>
                        <th className='px-4 py-2 w-96 text-left'>
                            Creation Date
                        </th>
                        {/* <th className='px-4 py-2 w-96 text-left rounded-tr-md'>
                        Admin Status
                    </th> */}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.length > 0 &&
                        data.map((data, key) => (
                            <AdminTableData
                                id={key + 1}
                                key={key}
                                data={data}
                                isAdminInfo
                            />
                        ))}
                </tbody>
            </table>
            {!data || data.length === 0 ? (
                <span className='mt-2'>{msg}</span>
            ) : (
                ''
            )}
        </>
    )
}

const AdminTableData = ({ id, isAdminInfo, data }) => {
    const date = new Date(data.updatedAt).toString().split(' ')
    return (
        <tr
            style={{
                backgroundColor: !isAdminInfo ? '#cccccc2e' : '',
                color: !isAdminInfo ? '#858585' : '',
            }}
        >
            <td className='px-4 py-2 border-opacity-70 text-white'>{id}</td>
            <td className='px-4 py-2 border-opacity-70'>{data.email}</td>
            {data.isVerified ? (
                <td className='px-4 py-2 border-opacity-70'>✔️</td>
            ) : (
                <td className='px-4 py-2 border-opacity-70'>❌</td>
            )}
            <td className='px-4 py-2 border-opacity-70'>
                {`${date[1]} ${date[2]},${date[3]}`}
            </td>
        </tr>
    )
}

const AdminInfo = ({ count1, count2, open, setOpen }) => {
    const [id, setId] = useState('')
    const [status, setStatus] = useState('')

    return (
        <div className='bg-[#312d4d1f] shadow-md rounded-lg w-full h-max flex flex-col screen2:w-full'>
            <div className='top p-3 py-2 bg-[#23234970] rounded-t-lg border-none'>
                <span className='text-sm'>Admin Info</span>
            </div>
            <div className='bottom h-full flex justify-between items-center border-t-2 p-3 px-5 border-BorderColor screen1:px-2 screen18:flex-col screen18:items-start screen18:gap-y-8'>
                <div className='adminData flex flex-col justify-between'>
                    <div className='top gap-x-5 flex items-center'>
                        <span className='text-2xl font-bold mr-2 screen5:text-xl screen10:text-lg'>
                            {count1} ADMINS
                        </span>
                    </div>
                    <div className='center flex items-center mt-5 gap-x-3'>
                        <Button
                            className='rounded-lg flex items-center justify-center px-8 w-max bg-CardCycle hover:bg-HoverCardCycle transition-opacity delay-500 py-px screen5:text-sm screen13:px-4'
                            onClick={() => {
                                setOpen(true)
                                setId('APPOINT ADMIN')
                                setStatus(11)
                            }}
                        >
                            Appoint Admin
                        </Button>
                        <Button
                            className='rounded-lg flex items-center justify-center px-8 w-max bg-CardCycle hover:bg-HoverCardCycle transition-opacity delay-500 py-px screen5:text-sm screen13:px-4'
                            onClick={() => {
                                setOpen(true)
                                setId('DISMISS ADMIN')
                                setStatus(12)
                            }}
                        >
                            Dismiss Admin
                        </Button>
                    </div>
                </div>
            </div>
            <AdminModal open={open} setOpen={setOpen} id={id} status={status} />
        </div>
    )
}
