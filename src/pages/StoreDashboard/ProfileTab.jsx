import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const ProfileTab = ({ user, onFeatureClick }) => {
    const [profile, setProfile] = useState({ full_name: '', phone: '' });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                full_name: user.user_metadata?.full_name || '',
                phone: user.user_metadata?.phone || ''
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            data: { full_name: profile.full_name, phone: profile.phone }
        });

        if (error) {
            toast({ title: "Error al actualizar perfil", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Perfil actualizado", description: "Tu perfil se ha guardado correctamente." });
        }
        setLoading(false);
    };

    const handleUpdatePassword = async () => {
        if (password !== confirmPassword) {
            toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
            return;
        }
        if (password.length < 6) {
             toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            toast({ title: "Error al cambiar contraseña", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Contraseña actualizada", description: "Tu contraseña ha sido cambiada." });
            setPassword('');
            setConfirmPassword('');
        }
        setLoading(false);
    };

    const handleSaveChanges = () => {
        handleUpdateProfile();
        if (password) {
            handleUpdatePassword();
        }
    };


    return (
    <Card>
      <CardHeader>
        <CardTitle>Mi perfil</CardTitle>
        <p className="text-sm text-gray-600">Gestiona tu información personal y de cuenta.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <Input type="text" name="full_name" value={profile.full_name} onChange={handleProfileChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <Input type="email" value={user?.email || ''} readOnly />
            </div>
          </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <Input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} />
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
            <Input type="password" placeholder="Dejar en blanco para no cambiar" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nueva contraseña</label>
            <Input type="password" placeholder="Dejar en blanco para no cambiar" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button onClick={handleSaveChanges} className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
            <User className="mr-2 h-4 w-4" />
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </CardContent>
    </Card>
)};