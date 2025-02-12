import { BASE_URL  } from './Helper.js';
export const addAbout = async (payload) => {
    const response = await fetch("http://localhost:5000/api/addAbout", {
      method: "POST",
      body: payload, // No need for JSON.stringify()
    });
    return response;
  };
  /////////////Update About Pages////
   export async function updateAbout(id, formData) {
    
    return fetch(`${BASE_URL}/updateAbout/${id}`, {
      method: "PUT",
      body: formData,
     
    });
  }