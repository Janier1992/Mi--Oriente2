import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Users, Truck, MapPin, Clock, Star, Shield } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

const HomePage = () => {
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Domicilios - MiOriente</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/productos" className="text-white hover:text-primary transition-colors">
              Productos
            </Link>
            <Link to="/tiendas" className="text-white hover:text-primary transition-colors">
              Tiendas
            </Link>
            <Link to="/domiciliario/login" className="text-white hover:text-primary transition-colors">
              Domicilios
            </Link>
          </div>
           <Link to="/productos" className="relative text-white hover:text-primary transition-colors">
            <ShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="relative z-10 px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              La Plataforma de
              <span className="block text-primary">Domicilios #1</span>
              del Oriente Antioqueño
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Conectamos tiendas locales, clientes y domiciliarios en una experiencia única de compra y entrega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productos">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Explorar Productos
                </Button>
              </Link>
              <Link to="/ayuda">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3 text-lg"
                >
                  Conocer Más
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-slate-600">
              Una plataforma diseñada para todos: tiendas, clientes y domiciliarios.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Para Tiendas</h3>
              <p className="text-slate-600 mb-6">
                Registra tu tienda, sube productos y gestiona ventas con facilidad
              </p>
              <Link to="/tienda/login">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  Comenzar ahora
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Para Clientes</h3>
              <p className="text-slate-600 mb-6">
                Compra productos colombianos con entrega a domicilio
              </p>
              <Link to="/cliente/login">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  Comenzar ahora
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Para Domiciliarios</h3>
              <p className="text-slate-600 mb-6">
                Únete como domiciliario y genera ingresos extras
              </p>
              <Link to="/domiciliario/login">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  Comenzar ahora
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-200">
              Tecnología avanzada al servicio del comercio antioqueño
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/20 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Geolocalización inteligente</h3>
              <p className="text-gray-200">
                Sistema automático que conecta clientes con domiciliarios cercanos
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/20 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Entregas rápidas</h3>
              <p className="text-gray-200">
                Seguimiento en tiempo real y notificaciones instantáneas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/20 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Productos de calidad</h3>
              <p className="text-gray-200">
                Los mejores productos colombianos verificados
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/20 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pagos Seguros</h3>
              <p className="text-gray-200">
                Transacciones protegidas con comisiones transparentes
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              ¡Únete a la Revolución del Domicilio!
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Forma parte del ecosistema de comercio más grande del Oriente Antioqueño.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tienda/registro">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                  Registrar Mi Tienda
                </Button>
              </Link>
              <Link to="/productos">
              <Button 
                variant="outline" 
                className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3 text-lg"
              >
                Explorar Productos
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Domicilios - MiOriente</span>
              </div>
              <p className="text-gray-400">
                La plataforma líder de domicilios en el Oriente Antioqueño.
              </p>
            </div>
            
            <div>
              <span className="font-semibold text-white mb-4 block">Para Tiendas</span>
              <div className="space-y-2">
                <Link to="/tienda/registro" className="block text-gray-400 hover:text-white transition-colors">
                  Registrar Tienda
                </Link>
                <Link to="/tienda/login" className="block text-gray-400 hover:text-white transition-colors">
                  Gestión de productos
                </Link>
                <Link to="/tienda/login" className="block text-gray-400 hover:text-white transition-colors">
                  Panel de control
                </Link>
              </div>
            </div>
            
            <div>
              <span className="font-semibold text-white mb-4 block">Para Clientes</span>
              <div className="space-y-2">
                <Link to="/productos" className="block text-gray-400 hover:text-white transition-colors">
                  Explorar Productos
                </Link>
                <Link to="/cliente/login" className="block text-gray-400 hover:text-white transition-colors">
                  Realizar pedidos
                </Link>
                 <Link to="/cliente/dashboard" className="block text-gray-400 hover:text-white transition-colors">
                  Seguimiento
                </Link>
              </div>
            </div>
            
            <div>
              <span className="font-semibold text-white mb-4 block">Soporte</span>
              <div className="space-y-2">
                <Link to="/ayuda" className="block text-gray-400 hover:text-white transition-colors">
                  Centro de Ayuda
                </Link>
                <Link to="/contacto" className="block text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
                <Link to="/ayuda" className="block text-gray-400 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Domicilios - MiOriente. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;