export const registerUser = user => {
    return fetch(`/api/signup`, {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const signinUser = user => {
    return fetch(`/api/login`, {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const signout = user => {
    return fetch(`/api/signout`, {
        method: "GET",
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}