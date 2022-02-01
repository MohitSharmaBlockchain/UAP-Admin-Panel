import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { ReactComponent as FaUsers } from './FaUsers.svg'
import { ReactComponent as FaHandHoldingUSD } from './FaHandHoldingUSD.svg'
import { ReactComponent as FaCoins } from './FaCoins.svg'
import { ReactComponent as FaChartPie } from './FaChartPie.svg'
import { ReactComponent as FaCalendarCheck } from './FaCalendarCheck.svg'
import { ReactComponent as FaCalendarAlt } from './FaCalendarAlt.svg'
import { ReactComponent as MdDashboard } from './MdDashboard.svg'
import { ReactComponent as FaShekel } from './FaShekel.svg'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from './Modal'
import exportToCsv from './DownloadAllCSV'
// import Loader from './Loader'
// import Fausers from './FaUsers.svg';
// import Facoins from './FaCoins.svg';
// import FachartPie from './FaChartPie.svg';

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

const searchCategory = () => {
    let userData = document
        .getElementById('searchCategory__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchCategory__Name__Body')
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

const Users = () => {
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
                    <h1 className='third-H'> USERS </h1>
                    <button id='log'> Log Out </button>
                    <hr className='ruler' />
                    <div className='User'>
                        <div
                            className='top'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '4px',
                                width: '100%',
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
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td> Image </td>
                                    <td> Wallet Id </td>
                                    <td> Name </td>
                                    <td> Email </td>
                                    <td> NFT Count </td>
                                    <td> Balance </td>
                                    <td> Status </td>
                                    <td> Details</td>
                                </tr>
                            </thead>
                            <tbody className='tr' id='searchUser__Name__Body'>
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td>
                                            <img
                                                src={value.profileUrl}
                                                alt={value.username}
                                                width={'80px'}
                                                height={'80px'}
                                                style={{
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </td>
                                        <td> {value._id}</td>
                                        <td> {value.username} </td>
                                        <td> {value.email} </td>
                                        <td> {value.balance} </td>
                                        <td> {value.walletBalance} </td>
                                        <td>
                                            <button id='logTwo'>
                                                Deactivate
                                            </button>
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

const Products = () => {
    const [data, setData] = useState([])
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://nft-backend.unicus.one/admin/nfts', config)
            .then((result) => {
                setData(result.data.totalNfts)
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
                <div className='fourth'>
                    <h1 className='fourth-H'>NFT'S</h1>
                    <button id='log'>Log Out</button>
                    <hr />
                    <div className='Products'>
                        <div
                            className='top'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '4px',
                                width: '100%',
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
                        <table className='tableTwo'>
                            <thead>
                                <tr>
                                    <td> Names </td>
                                    <td> Owner ID </td>
                                    <td> TokenId </td>
                                    <td> Royalty </td>
                                    <td> Category </td>
                                    <td> Date </td>
                                    <td> Status </td>
                                    <td> Approve Status </td>
                                    <td> Views </td>
                                    <td> Details </td>
                                </tr>
                            </thead>
                            <tbody
                                className='tr'
                                id='searchProduct__Name__Body'
                            >
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
                        type={'NFT'}
                    />
                </div>
            )}
        </>
    )
}

const Orders = () => {
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
            .get('https://nft-backend.unicus.one/admin/bids', config)
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
                <div className='fifth'>
                    <h1 className=' fifth-H '> NFT BIDS </h1>
                    <button id='log'> Log Out</button>
                    <hr />
                    <div className='Orders'>
                        <div
                            className='top'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '4px',
                                width: '100%',
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
                        <table className='tableThree'>
                            <thead>
                                <tr>
                                    <td> Product Name </td>
                                    <td> Seller Name </td>
                                    <td> Buyer Name </td>
                                    <td> Currency </td>
                                    <td> Date </td>
                                    <td> Amount </td>
                                    <td> Details </td>
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

const Category = () => {
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
            .get('https://nft-backend.unicus.one/admin/nftStates', config)
            .then((result) => {
                setData(result.data.totalNftStates)
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
                <div className='sixth'>
                    <h1 className='sixth-H'>NFT STATUS</h1>
                    <button id='log'>Log Out</button>
                    <hr />
                    <div className='Category'>
                        <div
                            className='top'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '4px',
                                width: '100%',
                            }}
                        >
                            <input
                                className='inputThree'
                                placeholder='Search'
                                id='searchCategory__Name'
                                onKeyUp={searchCategory}
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
                        <table className='tableFour'>
                            <thead>
                                <tr>
                                    <td> Nft ID </td>
                                    <td> State </td>
                                    <td> Price </td>
                                    <td> From </td>
                                    <td> To </td>
                                    <td> Date </td>
                                    <td> Details </td>
                                </tr>
                            </thead>
                            <tbody
                                className='tr'
                                id='searchCategory__Name__Body'
                            >
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.nftId}</td>
                                        <td> {value.state} </td>
                                        <td> {value.price} </td>
                                        <td> {value.from} </td>
                                        <td> {value.to} </td>
                                        <td> {value.date} </td>
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

const Header = () => {
    return (
        <div className='first'>
            <h1 className=' first-H'> UNICUS </h1>
            <hr />
            <NavLink to='/dashboard' className='linkOne' activeClassName='one'>
                {' '}
                <MdDashboard className='imageOne' />
                Dashboard
            </NavLink>
            <NavLink to='/users' className='linkTwo' activeClassName='one'>
                {' '}
                <FaUsers className='imageOne' />
                Users
            </NavLink>
            <NavLink to='/products' className='linkThree' activeClassName='one'>
                {' '}
                <FaShekel className='imageOne' /> NFTS{' '}
            </NavLink>
            {/* <NavLink to='/orders' className='linkFour' activeClassName='one'>
                {' '}
                <FaCoins className='imageOne' />
                NFT Bids{' '}
            </NavLink> */}
            <NavLink to='/category' className='linkFive' activeClassName='one'>
                {' '}
                <FaChartPie className='imageOne' />
                NFT Status
            </NavLink>
        </div>
    )
}

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className='routes'>
                <Header />

                <Route path='/dashboard' component={Dashboard} exact={true} />
                <Route path='/users' component={Users} />
                <Route path='/products' component={Products} />
                <Route path='/orders' component={Orders} />
                <Route path='/category' component={Category} />
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(<AppRouter />, document.getElementById('app'))

function App() {
    return null
}
export default App
