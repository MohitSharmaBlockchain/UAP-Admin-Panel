import '../../App.css'
import React, { useEffect, useState } from 'react'
import { ReactComponent as FaUsers } from '../../FaUsers.svg'
import { ReactComponent as FaHandHoldingUSD } from '../../FaHandHoldingUSD.svg'
import { ReactComponent as FaCoins } from '../../FaCoins.svg'
import { ReactComponent as FaChartPie } from '../../FaChartPie.svg'
import { ReactComponent as FaCalendarCheck } from '../../FaCalendarCheck.svg'
import { ReactComponent as FaCalendarAlt } from '../../FaCalendarAlt.svg'
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://nft-backend.unicus.one/admin/dashboard', config)
            .then((result) => {
                setData(result.data)
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
                <div className='second'>
                    <h1 className='second-H'> DASHBOARD </h1>
                    <button id='log'> Log Out </button>
                    <hr />
                    <div className='card'>
                        <div className='cardOne'>
                            <FaUsers className='Image' />
                            <div>
                                <p className='cardOne-P'>User's</p>
                                <h4 className='cardOne-H'>{data.totalUsers}</h4>
                            </div>
                        </div>

                        <div className='cardOne'>
                            <FaCoins className='ImageTwo' />
                            <div>
                                <p className='cardOne-P'>NFT's</p>
                                <h4 className='cardOne-H'>{data.totalNFTS}</h4>
                            </div>
                        </div>

                        <div className='cardOne'>
                            <FaChartPie className='ImageThree' />
                            <div>
                                <p className='cardOne-P'>Auctions</p>
                                <h4 className='CardOne-H'>
                                    {data.totalAuction}
                                </h4>
                            </div>
                        </div>

                        <div className='cardOne'>
                            <FaHandHoldingUSD className='ImageFour' />
                            <div>
                                <p className='cardOne-P'>Sales</p>
                                <h4 className='CardOne-H'>{data.totalSale}</h4>
                            </div>
                        </div>

                        <div className='cardOne'>
                            <FaCalendarAlt className='ImageFive' />
                            <div>
                                <p className='cardOne-P'>Total Bids</p>
                                <h4 className='CardOne-H'>{data.totalBids}</h4>
                            </div>
                        </div>

                        <div className='cardOne'>
                            <FaCalendarCheck className='ImageSix' />
                            <div>
                                <p className='cardOne-P'>Sales Ended</p>
                                <h4 className='CardOne-H'>
                                    {data.totalSalesEnded}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            )}
        </>
    )
}

export default Dashboard
