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
}

}