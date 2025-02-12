import { Token } from './Helper.js';
// User register Api//////////
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
//Login Api////////////

export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/login', { // Correct API route
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json(); // Parse JSON response

    if (!response.ok) {
      throw new Error(data.error || "Login failed.");
    }

    return data; // Should return { user, auth }
  } catch (error) {
    return { error: error.message };
  }
};

///////////// All users Api//////////////

export const AllUsers = async () => {
  const response = await fetch('http://localhost:5000/api/userdetails',Token);
  return response;
};


// Delete User API function
export const DeleteUser = async (id) => {
     const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'DELETE', // DELETE method to delete the user
      ...Token,
    });
    return response;
  };
//////////////get user for Update//////////
export const UpdateUser = async (id, userData) => {
  if (!id) throw new Error("User ID is missing");

  const response = await fetch(`http://localhost:5000/api/updateuser/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
      ...Token.headers,
     },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};


// Home Module Routes







// About  Module Routes
