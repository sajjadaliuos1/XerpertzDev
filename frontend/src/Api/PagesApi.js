import { BASE_URL  } from './Helper.js';
export const addServices = async (payload) => {
    const response = await fetch("http://localhost:5000/api/addServices", {
      method: "POST",
      body: payload, // No need for JSON.stringify()
    });
    return response;
  };

  /////////////Update About Pages////
   export async function updateServices(id, formData) {
    
    return fetch(`${BASE_URL}/updateServices/${id}`, {
      method: "PUT",
      body: formData,
     
    });
  }
//////////////// add Portfolio////////
export const addPortfolio = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addPortfolio", {
      method: "POST",
      body: payload
  });
  return response;
};
/////////update Portfolio////// export async function updateServices(id, formData) {
  export async function updatePortfolio(id, formData) {
    return fetch(`${BASE_URL}/updatePortfolio/${id}`, {
      method: "PUT",
      body: formData,
     
    });
  }
  //////////////// add Portfolio////////
export const addDomain = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addDomain", {
      method: "POST",
      body: payload
  });
  return response;
};