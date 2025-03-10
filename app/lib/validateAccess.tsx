const raw = "";

const requestOptions:RequestInit = {
  method: "GET",
  body: raw,
  redirect: "follow",
};

const u = 'http://10.58.10.61:9099/swagger/index.html'

// Función para agregar un timeout a la solicitud fetch
export async function fetchWithTimeout(url = u, timeout = 1500) {
  // Crear una promesa que se rechaza después del timeout
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);
  });

  // Combinar la solicitud fetch con el timeout
  const fetchPromise = fetch(url, requestOptions);

  // Usar Promise.race para competir entre la solicitud y el timeout
  return Promise.race([fetchPromise, timeoutPromise]);
}
