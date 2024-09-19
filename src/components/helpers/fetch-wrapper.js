
const backendurl =  process.env.DEV_API_URL
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELETE')
};

function request(method) {


    return (url,token,body) => {
        
        const requestOptions = {
            method,
            headers: authHeader(url,token)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url,token) {
    // return auth header with jwt if user is logged in and request is to the api url
   
    
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(backendurl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
   
    return 1;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        

        return data;
    });
}