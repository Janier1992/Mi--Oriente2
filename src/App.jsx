
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import StoreLogin from '@/pages/StoreLogin';
import StoreRegister from '@/pages/StoreRegister';
import StoreDashboard from '@/pages/StoreDashboard/index.jsx';
import CustomerLogin from '@/pages/CustomerLogin';
import CustomerRegister from '@/pages/CustomerRegister';
import CustomerDashboard from '@/pages/CustomerDashboard';
import DeliveryLogin from '@/pages/DeliveryLogin';
import DeliveryRegister from '@/pages/DeliveryRegister';
import DeliveryDashboard from '@/pages/DeliveryDashboard';
import HelpCenter from '@/pages/HelpCenter';
import ProductsPage from '@/pages/ProductsPage';
import StoresPage from '@/pages/StoresPage';
import ContactPage from '@/pages/ContactPage';
import AuthConfirmation from '@/pages/AuthConfirmation';
import CheckoutPage from '@/pages/CheckoutPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Domicilios MiOriente - Plataforma #1 del Oriente Antioqueño</title>
        <meta name="description" content="La plataforma líder de domicilios en el Oriente Antioqueño. Conectamos tiendas locales, clientes y domiciliarios en una experiencia única de compra y entrega." />
      </Helmet>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/tiendas" element={<StoresPage />} />
          <Route path="/tienda/login" element={<StoreLogin />} />
          <Route path="/tienda/registro" element={<StoreRegister />} />
          <Route path="/tienda/dashboard" element={<StoreDashboard />} />
          <Route path="/cliente/login" element={<CustomerLogin />} />
          <Route path="/cliente/registro" element={<CustomerRegister />} />
          <Route path="/cliente/dashboard" element={<CustomerDashboard />} />
          <Route path="/domiciliario/login" element={<DeliveryLogin />} />
          <Route path="/domiciliario/registro" element={<DeliveryRegister />} />
          <Route path="/domiciliario/dashboard" element={<DeliveryDashboard />} />
          <Route path="/ayuda" element={<HelpCenter />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/terminos-y-condiciones" element={<TermsPage />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/auth/confirm" element={<AuthConfirmation />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
