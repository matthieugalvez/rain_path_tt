export async function getHello() {
  const response = await fetch('http://localhost:3000/hello');

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
}
