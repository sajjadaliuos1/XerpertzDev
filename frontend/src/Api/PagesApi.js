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
  //////////////// add Domain////////
export const addDomain = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addDomain", {
      method: "POST",
      body: payload
  });
  return response;
};
/////////////Update domain page////
export async function updateDomain(id, formData) {
    
  return fetch(`${BASE_URL}/updateDomain/${id}`, {
    method: "PUT",
    body: formData,
   
  });
}
////////////add Team api//////
export const addTeam = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addTeam", {
      method: "POST",
      body: payload
  });
  return response;
};
/////////////Update Team page////
export async function updateTeam(id, formData) {
    
  return fetch(`${BASE_URL}/updateTeam/${id}`, {
    method: "PUT",
    body: formData,
   
  });
}
////////////add Client api//////
export const addClient = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addClient", {
      method: "POST",
      body: payload
  });
  return response;
};
/////////////Update Client page////
export async function updateClient(id, formData) {
    
  return fetch(`${BASE_URL}/updateClient/${id}`, {
    method: "PUT",
    body: formData,
   
  });
}
////////////add Business api//////
export const addBusiness = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/addBusiness`, {
      method: "POST",
      body: payload
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add business");
    }
    
    return response;
  } catch (error) {
    console.error("Error in addBusiness API:", error);
    throw error;
  }
};
/////////////Update Business page////
export const updateBusiness = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateBusiness/${id}`, {
      method: "PUT",
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update business");
    }
    
    return response;
  } catch (error) {
    console.error("Error in updateBusiness API:", error);
    throw error;
  }
};
////////////add Contact api//////
export const addContact = async (payload) => {
  const response = await fetch("http://localhost:5000/api/addContact", {
      method: "POST",
      body: payload
  });
  return response;
};

/////////////Update Contact page////
export async function updateContact(id, formData) {
    
  return fetch(`${BASE_URL}/updateContact/${id}`, {
    method: "PUT",
    body: formData,
   
  });
}