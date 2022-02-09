import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // Navigate,
    Link,
    Navigate,
    useLocation,
} from 'react-router-dom'
import ReactDOM from 'react-dom'
import { ReactComponent as FaUsers } from './FaUsers.svg'
import { ReactComponent as FaChartPie } from './FaChartPie.svg'
import { ReactComponent as MdDashboard } from './MdDashboard.svg'
import { ReactComponent as FaShekel } from './FaShekel.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Pages/Dashboard/Dashboard'
import Users from './Pages/User/User'
import Products from './Pages/Products/Products'
import Orders from './Pages/Orders/Orders'
import Category from './Pages/Categories/Categories'
import Login from './Pages/Login/Login'
import { useEffect, useState } from 'react'
import logo from './logo_white.png'

const Header = () => {
    const [active, setActive] = useState('DASHBOARD')
    const location = useLocation()
    const path = location.pathname
    useEffect(() => {
        if (path === '/dashboard') {
            setActive('DASHBOARD')
        } else if (path === '/users') {
            setActive('USERS')
        } else if (path === '/products') {
            setActive('PRODUCTS')
        } else if (path === '/orders') {
            setActive('ORDERS')
        } else if (path === '/category') {
            setActive('CATEGORY')
        }
    }, [path])

    // console.log(location)

    return (
        <div className='first'>
            <Link to='/'>
                {/* <h1 className=' first-H'>UNICUS</h1> */}
                <img
                    src={logo}
                    alt='unicus'
                    width={'81%'}
                    style={{ margin: '7.6px 4px' }}
                />
            </Link>
            <hr />
            <Link
                to='/dashboard'
                className='link'
                activeClassName='one'
                style={{
                    background:
                        active === 'DASHBOARD'
                            ? 'rgba(196, 196, 196, 0.4)'
                            : '',
                }}
            >
                <MdDashboard className='imageOne' />
                Dashboard
            </Link>
            <Link
                to='/users'
                className='link'
                activeClassName='one'
                style={{
                    background:
                        active === 'USERS' ? 'rgba(196, 196, 196, 0.4)' : '',
                }}
            >
                <FaUsers className='imageOne' />
                Users
            </Link>
            <Link
                to='/nfts'
                className='link'
                activeClassName='one'
                style={{
                    background:
                        active === 'PRODUCTS' ? 'rgba(196, 196, 196, 0.4)' : '',
                }}
            >
                <FaShekel className='imageOne' /> NFTS
            </Link>
            {/* <Link to='/orders' className='link' activeClassName='one' style={{
                    background:
                        active === 'ORDERS'
                            ? 'rgba(196, 196, 196, 0.4)'
                            : '',
                }}>
                <FaCoins className='imageOne' />
                NFT Bids
            </Link> */}
            <Link
                to='/nftStatus'
                className='link'
                activeClassName='one'
                style={{
                    background:
                        active === 'CATEGORY' ? 'rgba(196, 196, 196, 0.4)' : '',
                }}
            >
                <FaChartPie className='imageOne' />
                NFT Status
            </Link>
        </div>
    )
}

const AppRouter = () => {
    const [isLogin, setLogin] = useState(true)
    const [err, setErr] = useState('')

    useEffect(() => {
        if (localStorage.getItem('adminnInfo')) {
            setLogin(true)
        }
        return () => {}
    }, [])

    const logoutAdminUser = (e) => {
        localStorage.removeItem('adminnInfo')
        setLogin(false)
    }

    return (
        <Router>
            <Routes>
                {/* <div className='routes'> */}
                <Route
                    path='/'
                    element={
                        !isLogin ? (
                            <Login
                                setLogin={setLogin}
                                err={err}
                                setErr={setErr}
                            />
                        ) : (
                            <Navigate to='/dashboard' />
                        )
                    }
                    exact={true}
                />
                <Route
                    path='/dashboard'
                    element={
                        isLogin ? (
                            <>
                                <Header />
                                <Dashboard logoutAdminUser={logoutAdminUser} />
                            </>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                    exact={true}
                />
                <Route
                    path='/users'
                    element={
                        isLogin ? (
                            <>
                                <Header />
                                <Users logoutAdminUser={logoutAdminUser} />
                            </>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                <Route
                    path='/nfts'
                    element={
                        isLogin ? (
                            <>
                                <Header />
                                <Products logoutAdminUser={logoutAdminUser} />
                            </>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                <Route
                    path='/orders'
                    element={
                        isLogin ? (
                            <>
                                <Header />
                                <Orders logoutAdminUser={logoutAdminUser} />
                            </>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                <Route
                    path='/nftStatus'
                    element={
                        isLogin ? (
                            <>
                                <Header />
                                <Category logoutAdminUser={logoutAdminUser} />
                            </>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                {/* </div> */}
            </Routes>
        </Router>
    )
}

ReactDOM.render(<AppRouter />, document.getElementById('app'))

function App() {
    return null
}
export default App
