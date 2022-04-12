import '../../App.css'
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from '../../Modal'
import exportToCsv from '../../DownloadAllCSV'

const searchOrder = () => {
    let userData = document
        .getElementById('searchOrder__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchOrder__Name__Body')
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

const Orders = ({ logoutAdminUser }) => {
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
            .get('https://media-prime-backend.herokuapp.com/admin/bids', config)
            .then((result) => {
                setData(result.data.totalBids)
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
                    <h3 style={{marginTop: '1rem'}}>Loading NFT Status List...</h3>
                </div>
            ) : (
                <div className='third'>
                    <div className='top__box__container'>
                        {/* <h1 className='third-H'> NFT BIDS </h1> */}
                        <Button
                            variant='primary'
                            onClick={(e) => logoutAdminUser(e)}
                        >
                            Logout
                        </Button>{' '}
                    </div>
                    <hr />
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
                            className='inputTwo'
                            placeholder='Search'
                            id='searchOrder__Name'
                            onKeyUp={searchOrder}
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
                    <div className='Orders'>
                        <table className='tableThree'>
                            <thead>
                                <tr>
                                    <th> Product Name </th>
                                    <th> Seller Name </th>
                                    <th> Buyer Name </th>
                                    <th> Currency </th>
                                    <th> Date </th>
                                    <th> Amount </th>
                                    <th> Details </th>
                                </tr>
                            </thead>
                            <tbody className='tr' id='searchOrder__Name__Body'>
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.name}</td>
                                        <td> {value.owner} </td>
                                        <td> {value.tokenId} </td>
                                        <td> {value.royalty} </td>
                                        <td> {value.category} </td>
                                        <td> {value.createdAt} </td>
                                        <td> {value.nftStatus} </td>
                                        <td>
                                            {' '}
                                            {value.isApproved
                                                ? `✔️`
                                                : `❌`}{' '}
                                        </td>
                                        <td> {value.views} </td>
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

export default Orders
