
// User Module Routes
export const registerUser = async (payload) => {
  const response = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
//Login////////////
// Login function
export const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/login', { // Correct API route
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};




// Home Module Routes







// About  Module Routes
