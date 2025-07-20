
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Truck, ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const DeliveryRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: '',
    licenseNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      vehicleType: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email', 'phone', 'address', 'vehicleType', 'licenseNumber', 'password'];
    if (requiredFields.some(field => !formData[field])) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Contraseña débil",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      data: {
        full_name: formData.name,
        phone: formData.phone,
        role: 'domiciliario',
        address: formData.address,
        vehicle_type: formData.vehicleType,
        license_number: formData.licenseNumber
      },
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`
      }
    });
    setLoading(false);
    
    if (!error) {
      toast({
        title: "¡Revisa tu correo!",
        description: "Te hemos enviado un enlace para confirmar tu cuenta.",
      });
      navigate('/auth/confirm');
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
              <Link to="/domiciliario/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
              <Button 
                className="flex-1 ml-2 bg-primary text-primary-foreground"
                disabled
              >
                Registrarse
              </Button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Carlos Rodríguez"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+57 300 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="address"
                    placeholder="Calle 123 #45-67, Bogotá"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de vehículo
                </label>
                <Select onValueChange={handleSelectChange} name="vehicleType">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moto">Motocicleta</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                    <SelectItem value="carro">Automóvil</SelectItem>
                    <SelectItem value="pie">A pie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Número de Cédula
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="licenseNumber"
                    placeholder="1234567890"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña (mínimo 6 caracteres)
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
                    minLength="6"
                  />
                </div>
              </div>

              <div className="bg-primary/10 p-3 rounded-lg text-sm border border-primary/20">
                <p className="text-slate-700">
                  <strong>Requisitos:</strong> Debes ser mayor de 18 años, tener documento de identidad válido y medio de transporte propio.
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse como domiciliario'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DeliveryRegister;
