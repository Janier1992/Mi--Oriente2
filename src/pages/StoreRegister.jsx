
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Store, ArrowLeft, Building, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const StoreRegister = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
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
      city: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['storeName', 'ownerName', 'email', 'phone', 'city', 'address', 'password'];
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
        full_name: formData.ownerName,
        phone: formData.phone,
        role: 'tienda',
        store_name: formData.storeName,
        address: `${formData.address}, ${formData.city}`
      },
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`
      }
    });
    setLoading(false);

    if (!error) {
      toast({
        title: "¡Revisa tu correo!",
        description: "Te hemos enviado un enlace para confirmar tu cuenta de tienda.",
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
              <Store className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Portal de Tiendas</CardTitle>
            <CardDescription>Registra tu negocio en nuestra plataforma.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex mb-6">
              <Link to="/tienda/login" className="flex-1">
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
                  Nombre de la tienda
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="storeName"
                    placeholder="Mi Tienda Colombiana"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre del propietario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="ownerName"
                    placeholder="Juan Pérez"
                    value={formData.ownerName}
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
                    placeholder="tienda@ejemplo.com"
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
                    placeholder="300 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ciudad
                </label>
                <Select onValueChange={handleSelectChange} name="city">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rionegro">Rionegro</SelectItem>
                    <SelectItem value="Marinilla">Marinilla</SelectItem>
                    <SelectItem value="El Retiro">El Retiro</SelectItem>
                    <SelectItem value="La Ceja">La Ceja</SelectItem>
                    <SelectItem value="Guarne">Guarne</SelectItem>
                    <SelectItem value="San Vicente">San Vicente</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="Calle 123 #45-67"
                    value={formData.address}
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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Tienda'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StoreRegister;
