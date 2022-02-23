import '../../App.css'
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from '../../Modal'
import exportToCsv from '../../DownloadAllCSV'
import { parseOriginalDate } from '../../data'

const searchProduct = () => {
    let userData = document
        .getElementById('searchProduct__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchProduct__Name__Body')
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

const Products = ({ logoutAdminUser }) => {
    const [data, setData] = useState([])
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://unicusbackend.herokuapp.com/admin/nfts', config)
            .then((result) => {
                setData(result.data.totalNfts)
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
            .post('https://unicusbackend.herokuapp.com/nft/banNFT', {
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
            .post('https://unicusbackend.herokuapp.com/nft/unbanNFT', {
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
                    <h3 style={{ marginTop: '1rem' }}>Loading NFT List...</h3>
                </div>
            ) : (
                <div className='third'>
                    <div className='top__box__container'>
                        {/* <h1 className='third-H'> NFT's </h1> */}
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
                            className='inputOne'
                            placeholder='Search'
                            id='searchProduct__Name'
                            onKeyUp={searchProduct}
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
                    <div className='Products'>
                        <table className='tableTwo'>
                            <thead>
                                <tr>
                                    <th> NFT Name </th>
                                    <th> UserInfo </th>
                                    {/* <td> TokenId </td> */}
                                    <th> Status </th>
                                    <th> Chain </th>
                                    <th> Collection Name </th>
                                    <th> Date </th>
                                    <th> Ban/Unban </th>
                                    {/* <td> Approve Status </td> */}
                                    {/* <td> Views </td> */}
                                    <th> Details </th>
                                </tr>
                            </thead>
                            <tbody
                                className='tr'
                                id='searchProduct__Name__Body'
                            >
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.name}</td>
                                        <td> {value.userInfo} </td>
                                        {/* <td> {value.tokenId} </td> */}
                                        <td>
                                            {' '}
                                            {value.nftStatus === 1
                                                ? 'Artist Portfolio'
                                                : value.nftStatus === 2
                                                ? 'Sale'
                                                : 'Auction'}{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            {value.chain === 137
                                                ? 'Polygon'
                                                : value.nftStatus === 56
                                                ? 'Binance'
                                                : 'Ethereum'}{' '}
                                        </td>
                                        <td>{value.collectionName}</td>
                                        <td>
                                            {' '}
                                            {parseOriginalDate(
                                                value.createdAt
                                            )}{' '}
                                        </td>
                                        {/* <td>
                                            {' '}
                                            {value.isApproved
                                                ? `✔️`
                                                : `❌`}{' '}
                                        </td> */}
                                        {/* <td> {value.views} </td> */}
                                        <td className='flex items-center justify-center'>
                                            {value.active !== false ? (
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
                        type={'NFT'}
                    />
                </div>
            )}
        </>
    )
}

export default Products
