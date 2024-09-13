import { Routes, Route } from 'react-router-dom'
import './App.css'
import AppHeader from './components/AppHeader'
import AdvertisementPage from './pages/AdvertisementPage'
import AdvertisementsPage from './pages/AdvertisementsPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
    <>
    <AppHeader />
    <Routes>
       <Route path="/" element={<AdvertisementsPage />} />
       <Route path="/advertisements/:id" element={<AdvertisementPage />} />
       <Route path="/orders" element={<OrdersPage />} />
    </Routes>
    </>
  )
}

export default App
