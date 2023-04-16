
const jwtFetch = async (url, options={}) => {
    options.method ||= "GET";
    options.header ||= {}; // not to content-type?
    // retreive from localstorage
    const jwtToken = localStorage.getItem('jwtToken');
    // add to headers if an authorization token is found
    if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;

    // if verb is not get
    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] ||= "application/json";
        // look for + add csrf token
        options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
    }

    // do a fetch request with out customized options
    const res = await fetch(url, options);

    // if there is an error, throw it
    if (res.status >= 400) throw res;

    return res;
}

// helper to get value within a cookie
const getCookie = (cookieName) => {
    // split to get a list of all cookies
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        // split cookie into key value pairs
        const [name, value] = cookie.split('=');
        // if the name is the cookie we are looking for, return
        if (name.trim() === cookieName) return value;
    }
    // if there are no mathces
    return null;
}

export default jwtFetch;