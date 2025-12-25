import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/dashboard/Dashboard'
import AddTransaction from './pages/transaction/AddTransaction'
import Category from './pages/category/Category'
import Account from './pages/accounts/Account'
import Report from './pages/reports/Report'
import NotFound from './pages/notfound/NotFound'
import Transaction from './pages/transaction/Transaction'
import SubCategory from './pages/category/SubCategory'

function App() {

  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/addtransaction" element={<AddTransaction />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcategories" element={<SubCategory />} />
          <Route path="/account" element={<Account />} />
          <Route path='/report' element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
