// Función para enviar correo (realiza una solicitud HTTP a tu servidor backend)
export const enviarCorreo = async (email, tipoEvento) => {
  const respuesta = await fetch('https://mi-backend.com/enviar-correo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      evento: tipoEvento,
    }),
  });

  if (!respuesta.ok) {
    throw new Error('Error al enviar el correo');
  }
};
