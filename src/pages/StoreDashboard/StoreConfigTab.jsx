import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const StoreConfigTab = ({ store: initialStore, setStore, user }) => {
  const [storeConfig, setStoreConfig] = useState({
    name: '',
    description: '',
    logo_url: '',
    address: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialStore) {
      setStoreConfig({
        name: initialStore.name || '',
        description: initialStore.description || '',
        logo_url: initialStore.logo_url || '',
        address: initialStore.address || '',
        category: initialStore.category || ''
      });
    }
  }, [initialStore]);

  const handleConfigChange = (e) => {
    setStoreConfig({ ...storeConfig, [e.target.name]: e.target.value });
  };

  const handleSaveConfig = async () => {
    if (!user) {
        toast({ title: "Error", description: "Debes iniciar sesión para guardar.", variant: "destructive" });
        return;
    }

    setLoading(true);
    let updatedStore;

    if (initialStore) {
        const { data, error } = await supabase
            .from('stores')
            .update(storeConfig)
            .eq('id', initialStore.id)
            .select()
            .single();
        if (error) {
            toast({ title: "Error al actualizar", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Configuración guardada", description: "Los cambios se han guardado exitosamente" });
            updatedStore = data;
        }
    } else {
        const { data, error } = await supabase
            .from('stores')
            .insert({ ...storeConfig, owner_id: user.id })
            .select()
            .single();
        if (error) {
            toast({ title: "Error al crear la tienda", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "¡Tienda creada!", description: "Tu tienda ha sido configurada exitosamente." });
            updatedStore = data;
        }
    }
    
    if (updatedStore) {
      setStore(updatedStore);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialStore ? "Configuración de la tienda" : "Crea tu tienda"}</CardTitle>
        <p className="text-sm text-gray-600">Actualiza los detalles públicos de tu tienda.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la tienda</label>
            <Input type="text" name="name" value={storeConfig.name} onChange={handleConfigChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de la tienda</label>
            <Textarea name="description" value={storeConfig.description} onChange={handleConfigChange} rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <Input type="text" name="category" value={storeConfig.category} onChange={handleConfigChange} placeholder="Ej: Café, Artesanías, etc."/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL del logotipo</label>
              <Input type="url" name="logo_url" value={storeConfig.logo_url} onChange={handleConfigChange} placeholder="https://ejemplo.com/logo.png" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <Input type="text" name="address" value={storeConfig.address} onChange={handleConfigChange} />
          </div>
          <Button onClick={handleSaveConfig} className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
            <Settings className="mr-2 h-4 w-4" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
