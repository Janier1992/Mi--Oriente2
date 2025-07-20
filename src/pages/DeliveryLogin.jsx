
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Truck, ArrowLeft, Mail, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const DeliveryLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    setLoading(false);
    
    if (!error) {
      toast({
        title: "¡Bienvenido!",
        description: "Inicio de sesión exitoso"
      });
      navigate('/domiciliario/dashboard');
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center text-white hover:text-orange-200 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Portal de Domiciliarios</CardTitle>
            <CardDescription>Únete y genera ingresos extra entregando productos</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex mb-6">
              <Button 
                className="flex-1 bg-primary text-primary-foreground"
                disabled
              >
                Iniciar sesión
              </Button>
              <Link to="/domiciliario/registro" className="flex-1 ml-2">
                <Button variant="outline" className="w-full">
                  Registrarse
                </Button>
              </Link>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="domiciliario@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3" disabled={loading}>
                {loading ? 'Iniciando...' : 'Iniciar sesión'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">¿Por qué ser domiciliario?</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Horarios flexibles</li>
                <li>• Ingresos extra inmediatos</li>
                <li>• Pagos semanales</li>
                <li>• Cobertura de seguro</li>
                <li>• Bonificaciones por rendimiento</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DeliveryLogin;
