
     export const Token = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    export const BASE_URL = "http://localhost:5000/api/";
