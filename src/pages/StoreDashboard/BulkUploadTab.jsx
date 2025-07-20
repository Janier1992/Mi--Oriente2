import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const BulkUploadTab = () => {
  const handleBulkUpload = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carga Masiva de Productos</CardTitle>
        <p className="text-sm text-gray-600">Ahorra tiempo agregando múltiples productos desde un archivo Excel (.xlsx).</p>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <Button onClick={handleBulkUpload} className="mb-4">
            Seleccionar archivo
          </Button>
          <p className="text-sm text-gray-500">O arrastra y suelta el archivo aquí</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          El archivo debe tener las columnas en este orden: nombre, descripción, precio, categoría, stock, descuento (opcional). La primera fila debe ser el encabezado.
        </p>
        <Button onClick={handleBulkUpload} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          Cargar productos
        </Button>
      </CardContent>
    </Card>
  );
};