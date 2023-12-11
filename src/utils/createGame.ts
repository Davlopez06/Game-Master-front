/* eslint-disable */
export const createGame = async (data: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/games`;

  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        console.log('Hubo un problema al enviar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
