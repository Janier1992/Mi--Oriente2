import React from 'react';

// Ya no importamos el router ni nada más, solo React.

function App() {
  return (
    // Vamos a renderizar el mensaje más simple posible
    // con un poco de estilo para que sea visible.
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '2rem',
      color: 'black',
      backgroundColor: 'lightgreen' // Fondo verde para estar seguros de que no es el amarillo del CSS
    }}>
      ¡Hola Mundo! ¡La aplicación funciona!
    </div>
  );
}

export default App;