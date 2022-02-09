import { Modal, Button } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import exportToCsv from './DownloadCSV'
import { parseOriginalDate } from './data'

export default function MyVerticallyCenteredModal({
    show,
    setShow,
    details,
    type,
}) {
    const handleClose = () => setShow(false)
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                className='modal__open__details'
            >
                <Modal.Header closeButton className='header__container__modal'>
                    <Modal.Title>{type} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className='containerDetails'
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '60vh',
                            overflow: 'scroll',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                        }}
                    >
                        {Object.entries(details).map((data) => {
                            return (
                                <>
                                    {data[0] !== 'password' &&
                                        data[0] !== 'backgroundUrl' &&
                                        data[0] !== '_id' &&
                                        data[0] !== 'owner' &&
                                        data[0] !== 'uploadedBy' &&
                                        data[0] !== 'verificationToken' &&
                                        data[0] !== '__v' &&
                                        data[0] !== 'isApproved' &&
                                        data[0] !== 'balances' &&
                                        data[0] !== 'walletBalance' &&
                                        data[0] !== 'tokenId' &&
                                        data[0] !== 'isVerified' &&
                                        data[1] !== '' &&
                                        data[0] !== 'jsonHash' &&
                                        data[0] !== 'cloudinaryUrl' && (
                                            <div
                                                className='row'
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                {Array.isArray(data[1]) ? (
                                                    <p
                                                        style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {data[0].toUpperCase()}{' '}
                                                        :-
                                                    </p>
                                                ) : (
                                                    <p
                                                        style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {data[0] === '_id'
                                                            ? 'ID'
                                                            : data[0].toUpperCase()}
                                                    </p>
                                                )}

                                                {Array.isArray(data[1]) ? (
                                                    data[0] === 'tags' ? (
                                                        <ol
                                                            type='1'
                                                            style={{
                                                                marginLeft:
                                                                    '16px',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {data[1].map(
                                                                (data, key) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                key
                                                                            }
                                                                            style={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                justifyContent:
                                                                                    'space-between',
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    flex: 1,
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data.propertyType
                                                                                }{' '}
                                                                                :
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    flex: 1,
                                                                                    fontWeight:
                                                                                        'normal',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data.propertyName
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ol>
                                                    ) : (
                                                        <ol
                                                            type='1'
                                                            style={{
                                                                marginLeft:
                                                                    '16px',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {data[1].map(
                                                                (data, key) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                key
                                                                            }
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontWeight:
                                                                                        'normal',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ol>
                                                    )
                                                ) : (
                                                    <DataValue data={data} />
                                                )}
                                            </div>
                                        )}
                                </>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        onClick={(e) => exportToCsv(e, Object.entries(details))}
                    >
                        Download CSV
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const DataValue = ({ data }) => {
    let value = data[1]
    if (
        data[0] === 'createdAt' ||
        data[0] === 'updatedAt' ||
        data[0] === 'date'
    ) {
        value = parseOriginalDate(data[1])
    } else if (data[0] === 'nftStatus') {
        if (data[1] === 1) {
            value = 'Artist Portfolio'
        } else if (data[1] === 2) {
            value = 'Sale'
        } else if (data[1 === 3]) {
            value = 'Auction'
        }
    } else if (data[0] === 'userType') {
        if (data[1] === 1) {
            value = 'Email'
        } else if (data[1] === 2) {
            value = 'Wallet'
        } else if (data[1] === 3) {
            value = 'Email and Wallet'
        }
    } else if (data[0] === 'chain') {
        if (data[1] === 1) {
            value = 'Polygon'
        } else if (data[1] === 56) {
            value = 'Binance'
        } else if (data[1] === 137) {
            value = 'Ethereum'
        }
    }
    return (
        <p
            style={{
                flex: 1,
            }}
        >
            {data[1] === true ? 'YES' : data[1] === false ? 'NO' : value}
        </p>
    )
}
