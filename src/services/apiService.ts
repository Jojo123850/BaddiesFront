// const browserUrl = window.location.href
// const isLocalHost = browserUrl.includes('localhost')



// const BASE_URL = isLocalHost 
// ? 'https://localhost:3000/api/v1/'
// : 'https://jsonplaceholder.typicode.com/'

const BASE_URL = 'http://localhost:3001'

export const apiService = {
    async getPosts(signal:AbortSignal) {

            const req = await fetch(`${BASE_URL}/posts`, {
                signal
            })

            if(!req.ok){
                throw new Error(`Error HTTP:${req.status}`)
            }

            return await req.json()
            
      
    },
    async login(email: string, password: string, signal: AbortSignal) {
    const req = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        signal
    })

    if (!req.ok) {
        throw new Error(`Error HTTP: ${req.status}`)
    }

    return await req.json()
},

 async register(email: string, password: string, pseudo:string, signal: AbortSignal) {
    const req = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pseudo, email, password }),
        signal
    })

    if (!req.ok) {
        const errorData = await req.json()

        throw new Error(
            errorData.error || errorData.message || `Error HTTP: ${req.status}`
        )
    }

    return await req.json()
},


async forgotPassword(email: string, signal: AbortSignal) {
    const req = await fetch(`${BASE_URL}/api/v1/auth/forgotPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email}),
        signal
    })

    if (!req.ok) {
        const errorData = await req.json()

        throw new Error(
            errorData.error || errorData.message || `Error HTTP: ${req.status}`
        )
    }

    return await req.json()
},



async resetPassword(
    token: string,
    newPassword: string,
    signal: AbortSignal
) {
    const req = await fetch(
        `${BASE_URL}/api/v1/auth/resetPassword`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                newPassword
            }),
            signal
        }
    )

    if (!req.ok) {
        const errorData = await req.json()

        throw new Error(
            errorData.error ||
            errorData.message ||
            `Error HTTP: ${req.status}`
        )
    }

    return await req.json()
}
}