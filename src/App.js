import './App.css'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
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
                NFT Life Cycle
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
