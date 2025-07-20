import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const AnalyticsTab = () => {
  const handleFeatureClick = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de ventas</CardTitle>
        <p className="text-sm text-gray-600">Visualiza el rendimiento de tu tienda</p>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Análisis Avanzados</h3>
          <p className="text-gray-600 mb-4">Gráficos e informes detallados próximamente.</p>
          <Button onClick={handleFeatureClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ver informes detallados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};