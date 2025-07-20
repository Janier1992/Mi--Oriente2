import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const AddProductTab = ({ onProductAdded, storeId }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    discount: '0',
    stock: '',
    description: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setNewProduct({ ...newProduct, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeId) {
        toast({ title: "Error", description: "ID de tienda no encontrado.", variant: "destructive" });
        return;
    }

    const requiredFields = ['name', 'category', 'price', 'stock', 'description'];
    if (requiredFields.some(field => !newProduct[field])) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('products').insert({
        ...newProduct,
        store_id: storeId,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
        discount: newProduct.discount ? parseFloat(newProduct.discount) : 0,
    });
    setLoading(false);

    if (error) {
        toast({ title: "Error al agregar producto", description: error.message, variant: "destructive" });
    } else {
        toast({ title: "¡Éxito!", description: "Producto agregado correctamente." });
        setNewProduct({ name: '', category: '', price: '', discount: '0', stock: '', description: '', image_url: '' });
        onProductAdded();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Producto</CardTitle>
        <p className="text-sm text-gray-600">Completa la información de tu producto.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
              <Input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <Select onValueChange={handleSelectChange} value={newProduct.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">Café</SelectItem>
                  <SelectItem value="artesanias">Artesanías</SelectItem>
                  <SelectItem value="alimentos">Alimentos</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                  <SelectItem value="dulces">Dulces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio (COP)</label>
              <Input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
              <Input type="number" name="discount" value={newProduct.discount} onChange={handleInputChange} min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Existencias</label>
              <Input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL de la imagen del producto (opcional)</label>
            <Input type="url" name="image_url" value={newProduct.image_url} onChange={handleInputChange} placeholder="https://ejemplo.com/imagen.jpg"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <Textarea name="description" value={newProduct.description} onChange={handleInputChange} rows={4} required />
          </div>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? 'Agregando...' : 'Agregar producto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
