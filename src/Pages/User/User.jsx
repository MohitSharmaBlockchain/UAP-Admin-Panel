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

const Users = ({ logoutAdminUser }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
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
    }, [])
    return (
        <>
            {loading ? (
                <div
                    className='flex items-center justify-center'
                    style={{
                        display: 'flex',
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
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td> Username </td>
                                    <td> Email </td>
                                    <td> User Type </td>
                                    <td> Created At</td>
                                    {/* <td> Balance </td> */}
                                    {/* <td> Status </td> */}
                                    <td> Details</td>
                                </tr>
                            </thead>
                            <tbody className='tr' id='searchUser__Name__Body'>
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.username} </td>
                                        <td> {value.email} </td>
                                        <td> {value.userType === 1 ? "Email" : (value.userType === 2 ? "Wallet" : "Email and Wallet")}</td>
                                        <td> {parseOriginalDate(value.createdAt)} </td>
                                        {/* <td> {value.balance} </td> */}
                                        {/* <td> {value.walletBalance} </td>
                                        <td>
                                            <Button variant='secondary'>
                                                Deactivate
                                            </Button>
                                        </td> */}
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
