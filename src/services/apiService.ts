// const browserUrl = window.location.href
// const isLocalHost = browserUrl.includes('localhost')



// const BASE_URL = isLocalHost 
// ? 'https://localhost:3000/api/v1/'
// : 'https://jsonplaceholder.typicode.com/'

export const BASE_URL = 'http://localhost:3001'

export type ProfileUser = {
    id: number;
    pseudo: string;
    email: string;
    avatar_url: string | null;
};

type ProfileUpdate = {
    pseudo: string;
    email: string;
    avatar_url: string;
};

const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Session expirée. Veuillez vous reconnecter.");
    }

    const response = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: refreshToken })
    });

    if (!response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        throw new Error("Session expirée. Veuillez vous reconnecter.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);

    return data.accessToken;
};

export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    let accessToken = localStorage.getItem("token");

    if (!accessToken) {
        throw new Error("Veuillez vous connecter.");
    }

    const sendRequest = (token: string) => {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);

        return fetch(url, {
            ...options,
            headers
        });
    };

    let response = await sendRequest(accessToken);

    if (response.status === 401) {
        accessToken = await refreshAccessToken();
        response = await sendRequest(accessToken);
    }

    return response;
};

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

    const data = await req.json()

    if (!req.ok) {
        throw new Error(
            data.message ||
            data.error ||
            `Erreur HTTP : ${req.status}`
        )
    }

    return data
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
            errorData.detail ||
            errorData.title ||
            errorData.error ||
            errorData.message ||
            `Error HTTP: ${req.status}`
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
},
async updateProfile(profile: ProfileUpdate): Promise<ProfileUser> {
    const response = await fetchWithAuth(
        `${BASE_URL}/api/v1/user/profile`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            `Erreur HTTP : ${response.status}`
        );
    }

    const user = data?.user;

    if (
        !user ||
        !Number.isSafeInteger(Number(user.id)) ||
        typeof user.pseudo !== "string" ||
        typeof user.email !== "string" ||
        !(user.avatar_url === null || typeof user.avatar_url === "string")
    ) {
        throw new Error("Réponse du serveur invalide.");
    }

    return user;
}
}
