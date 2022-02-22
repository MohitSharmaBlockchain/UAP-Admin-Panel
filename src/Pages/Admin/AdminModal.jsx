import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from 'react-bootstrap'
import '../../App.css'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { updateAdminAction } from '../../../redux/actions/userAction'
// https://nft-backend.unicus.one/admin/editAdmin
export const AdminModal = ({ open, setOpen, id, status }) => {
    const [walletAddress, setWalletAddress] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const cancelButtonRef = useRef(null)
    // const dispatch = useDispatch()

    const MakeAdmin = async (e) => {
        e.preventDefault()
        // dispatch(updateAdminAction(emailAddress, status))
        await axios
            .post(`https://nft-backend.unicus.one/admin/register`, {
                email: emailAddress,
            })
            .then((res) => {
                console.log(res.data)
                setOpen(false)
                // setAdminData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('CREATEED ADMIN!!')
        setOpen(false)
        // console.log(walletAddress, emailAddress)
    }

    const DeleteAdmin = async (e) => {
        e.preventDefault()
        console.log(emailAddress)
        // dispatch(updateAdminAction(emailAddress, status))
        await axios
            .post(`https://nft-backend.unicus.one/admin/deleteAdmin`, {
                email: emailAddress,
            })
            .then((res) => {
                console.log(res.data)
                setOpen(false)
                // setAdminData(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.msg)
            })
        console.log('DELETED ADMIN!!')
        console.log(walletAddress, emailAddress)
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <div className='items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='inline-block align-middle h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block bg-[#121212ce] rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full'>
                            <div className='bg-BackgroundColor px-4 pt-5 p-6 pb-4'>
                                <div className='flex items-start text-white'>
                                    <div className='mt-0 text-left w-full'>
                                        <Dialog.Title
                                            as='h1'
                                            className='text-xl leading-6 font-semibold'
                                        >
                                            {id}
                                        </Dialog.Title>
                                        <div className='my-12 flex flex-col gap-y-10'>
                                            {/* <Input
                                                title={`Enter Wallet Address`}
                                                placeHolder={`wallet address`}
                                                setValueOnChange={
                                                    setWalletAddress
                                                }
                                                type={'text'}
                                                value={walletAddress}
                                            /> */}
                                            <Input
                                                title={`Enter Email Address`}
                                                placeHolder={`johndoe@gmail.com`}
                                                setValueOnChange={
                                                    setEmailAddress
                                                }
                                                type={'email'}
                                                value={emailAddress}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#103a4a] py-3 px-6 flex flex-row-reverse gap-x-4'>
                                <Button
                                    type='button'
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </Button>
                                {id === 'APPOINT ADMIN' ||
                                id === 'APPOINT SUPER-ADMIN' ? (
                                    <Button
                                        type='submit'
                                        disabled={
                                            // walletAddress === '' &&
                                            emailAddress === ''
                                        }
                                        style={{
                                            cursor:
                                                // walletAddress === '' &&
                                                emailAddress === ''
                                                    ? 'not-allowed'
                                                    : '',
                                        }}
                                        onClick={(e) => MakeAdmin(e)}
                                    >
                                        MAKE {id.split(' ')[1]}
                                    </Button>
                                ) : (
                                    <Button
                                        type='submit'
                                        disabled={
                                            // walletAddress === '' &&
                                            emailAddress === ''
                                        }
                                        style={{
                                            cursor:
                                                // walletAddress === '' &&
                                                emailAddress === ''
                                                    ? 'not-allowed'
                                                    : '',
                                        }}
                                        onClick={(e) => DeleteAdmin(e)}
                                    >
                                        DELETE {id.split(' ')[1]}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const Input = ({ title, setValueOnChange, type, placeHolder, value }) => {
    return (
        <div className='royality flex flex-col'>
            <span className='text-lg ml-1 mb-1 screen13:text-base screen13:mb-0.5'>
                {title}
            </span>
            <input
                type={type}
                placeholder={placeHolder}
                className='p-1 px-2 bg-transparent outline-none border-2 border-[#0d6efd] rounded-md screen13:text-sm'
                onChange={(e) => setValueOnChange(e.target.value)}
                defaultValue={value}
                style={{
                    border: '2px solid #0d6efd89',
                }}
            />
        </div>
    )
}
