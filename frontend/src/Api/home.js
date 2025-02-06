export const addHome = async (payload) => {
  const response = await fetch('http://localhost:5000/api/addhome', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
