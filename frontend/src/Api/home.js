export const addHome = async (payload) => {

  const response = await fetch("http://localhost:5000/api/addhome", {
    method: "POST",
    body: payload, // No need for JSON.stringify()
  });
  return response;
};
////////////Home Details///////////
  export const homeDetails  = async () => {
    const response = await fetch('http://localhost:5000/api/homedetails');
    return response;
  };