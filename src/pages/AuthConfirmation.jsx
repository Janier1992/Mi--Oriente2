
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

const AuthConfirmation = () => {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800">¡Casi listo!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 text-lg">
              Hemos enviado un correo de confirmación a tu dirección de email.
            </p>
            <p className="text-slate-600">
              Por favor, haz clic en el enlace del correo para activar tu cuenta y poder iniciar sesión.
            </p>
            <p className="text-sm text-slate-500">
              (Si no lo encuentras, revisa tu carpeta de spam)
            </p>
            <Button asChild className="mt-6 w-full max-w-xs mx-auto">
              <Link to="/">Volver al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthConfirmation;
