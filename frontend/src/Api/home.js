import { Token } from './Helper.js';
const BASE_URL = "http://localhost:5000/api/";
export const addHome = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addhome", {
    method: "POST",
    body: payload, // No need for JSON.stringify()
  });
  return response;
};
////////////Home Details///////////
  export const homeDetails  = async () => {
    const response = await fetch('http://localhost:5000/api/homedetails',Token);
    return response;
  };
  // Delete Home Data API function
export const DeleteHome = async (id) => {
  const response = await fetch(`http://localhost:5000/api/home/${id}`, {
   method: 'DELETE', // DELETE method to delete the user
   ...Token,
 });
 return response;
 };
//////get one record for updation/////
export const getHomeById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/gethome/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...Token.headers,
      },
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

 /////////////Update Home///////////
 export async function updateHome(id, formData) {
  
  return fetch(`${BASE_URL}/updatehome/${id}`, {
    method: "PUT",
    body: formData,
    ...Token,
  });
}
