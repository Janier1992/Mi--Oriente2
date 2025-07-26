import React from 'react';
import ReactDOM from 'react-dom/client';

// No importamos ni App, ni CSS, ni nada más. Solo lo esencial.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '3rem',
      color: 'white',
      backgroundColor: 'green', // ¡Un fondo verde para estar 100% seguros!
      fontFamily: 'Arial, sans-serif'
    }}>
      VICTORIA. LA APLICACIÓN FUNCIONA.
    </div>
  </React.StrictMode>
);