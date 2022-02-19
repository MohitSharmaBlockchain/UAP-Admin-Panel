import '../../App.css'
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from '../../Modal'
import exportToCsv from '../../DownloadAllCSV'
import { parseOriginalDate } from '../../data'

const searchUser = () => {
    let userData = document
        .getElementById('searchUser__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchUser__Name__Body')
    let tr = container.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {
        const element = tr[i]

        let text = element.getElementsByTagName('td')
        let tdText = ''

        // console.log(text);

        for (let j = 0; j < text.length; j++) {
            tdText += text[j].innerText
        }
        // console.log(cardText);

        let textValue = tdText
        if (textValue.toUpperCase().indexOf(userData) > -1) {
            element.style.display = ''
        } else {
            element.style.display = 'none'
        }
    }
}

const filterData = (e, type) => {
    // let userData = document
    //     .getElementById('searchUserType__Name')
    //     .value.toUpperCase()
    let userData = ''
    if (type !== 'SKIP') {
        let id = parseInt(e.target.value)
        if (id === 1) {
            filterData(e, 'SKIP')
            userData = 'Email'
        } else if (id === 2) {
            filterData(e, 'SKIP')
            userData = 'mwallet'
        } else if (id === 3) {
            filterData(e, 'SKIP')
            userData = 'Email and Wallet'
        } else {
            userData = ''
        }
    }
    userData = userData.toUpperCase()
    console.log(userData)

    let container = document.getElementById('searchUser__Name__Body')
    let tr = container.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {
        const element = tr[i]

        let text = element.getElementsByTagName('td')
        let tdText = ''

        // console.log(text);

        for (let j = 0; j < text.length; j++) {
            tdText += text[j].innerText
        }
        // console.log(cardText);

        let textValue = tdText
        var regex = new RegExp(`${userData}`, "ig");

        if (textValue.toUpperCase().indexOf(userData) > -1) {
            if(userData === "EMAIL" && textValue.toUpperCase().indexOf("EMAIL AND WALLET") > -1) {
                element.style.display = 'none'
            } else {
                element.style.display = ''
            }
        } else {
            element.style.display = 'none'
        }
    }
}

const Users = ({ logoutAdminUser }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    // const [userType, setUserType] = useState(0)
    const [details, setDetails] = useState({})

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://nft-backend.unicus.one/admin/users', config)
            .then((result) => {
                setData(result.data.totalUsers)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [fetching])

    const banUser = async (e, id) => {
        e.preventDefault()
        axios
            .post('http://localhost:4000/users/banUser', {
                userId: id,
            })
            .then((req) => {
                console.log(req.data)
                setFetching(!fetching)
                // window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const unbanUser = async (e, id) => {
        e.preventDefault()
        axios
            .post('http://localhost:4000/users/unbanUser', {
                userId: id,
            })
            .then((req) => {
                console.log(req.data)
                setFetching(!fetching)
                // window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {loading ? (
                <div
                    className='flex items-center justify-center'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Spinner
                        animation='border'
                        role='status'
                        style={{ width: '6rem', height: ' 6rem' }}
                    />
                    <h3 style={{ marginTop: '1rem' }}>Loading User List...</h3>
                </div>
            ) : (
                <div className='third'>
                    <div className='top__box__container'>
                        {/* <h1 className='third-H'> USERS </h1> */}
                        <Button
                            variant='primary'
                            onClick={(e) => logoutAdminUser(e)}
                        >
                            Logout
                        </Button>
                    </div>
                    <hr className='ruler' />
                    <div
                        className='top'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '4px',
                            padding: '0 5px',
                        }}
                    >
                        <input
                            className='input'
                            placeholder='Search'
                            id='searchUser__Name'
                            onKeyUp={searchUser}
                            style={{
                                width: '100%',
                            }}
                        />
                        <Button
                            variant='primary'
                            onClick={(e) => exportToCsv(e, data)}
                        >
                            Download
                        </Button>
                    </div>
                    <br />
                    <div className='User'>
                        <table className='tableFour table__head'>
                            <thead>
                                <tr>
                                    <th> Display Name </th>
                                    <th> Email </th>
                                    <th className=''>
                                        <p className='m-0 float-left'>
                                            User Type
                                        </p>
                                        {/* <input type={'text'} className='w-20 px-1 py-1 ml-4'
                                            onKeyUp={filterData}
                                            placeholder='User Type'
                                            id='searchUserType__Name'
                                        /> */}
                                        <select
                                            className='filter__Select bg-transparent float-right outline-none border border-[#ccc] rounded-md p-1'
                                            onChange={
                                                (e) => filterData(e)
                                                // setUserType(e.target.value)
                                            }
                                            onDragEnd={(e) =>
                                                filterData(e, 'END')
                                            }
                                            defaultValue={0}
                                        >
                                            <option
                                                className='text-[#202020] p-2'
                                                value={1}
                                            >
                                                Email
                                            </option>
                                            <option
                                                className='text-[#202020] p-2'
                                                value={2}
                                            >
                                                Wallet
                                            </option>
                                            <option
                                                className='text-[#202020] p-2'
                                                value={3}
                                            >
                                                Both
                                            </option>
                                            <option
                                                className='text-[#202020] p-2'
                                                value={0}
                                            >
                                                All
                                            </option>
                                        </select>
                                    </th>
                                    <th> Created At</th>
                                    {/* <td> Balance </td> */}
                                    {/* <td> Status </td> */}
                                    <th> Ban/Unban</th>
                                    <th> Details</th>
                                </tr>
                            </thead>
                            <tbody className='tr' id='searchUser__Name__Body'>
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.username} </td>
                                        <td> {value.email} </td>
                                        <td>
                                            {' '}
                                            {value.userType === 1
                                                ? 'Email'
                                                : value.userType === 2
                                                ? 'Wallet'
                                                : 'Email and Wallet'}
                                        </td>
                                        <td>
                                            {' '}
                                            {parseOriginalDate(
                                                value.createdAt
                                            )}{' '}
                                        </td>
                                        {/* <td> {value.balance} </td> */}
                                        {/* <td> {value.walletBalance} </td>
                                        <td>
                                            <Button variant='secondary'>
                                                Deactivate
                                            </Button>
                                        </td> */}
                                        <td className='flex items-center justify-center'>
                                            {value.active ? (
                                                <Button
                                                    variant='secondary'
                                                    onClick={(e) => {
                                                        banUser(e, value._id)
                                                    }}
                                                >
                                                    BAN
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant='primary'
                                                    onClick={(e) => {
                                                        unbanUser(e, value._id)
                                                    }}
                                                >
                                                    UNBAN
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant='primary'
                                                onClick={() => {
                                                    setDetails(value)
                                                    setModalShow(true)
                                                }}
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        setShow={setModalShow}
                        details={details}
                        type={'User'}
                    />
                </div>
            )}
        </>
    )
}

export default Users
