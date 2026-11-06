
import {  SESSION_EXPIRED_MESSAGE,  notifySessionExpired  } from "./sessionService"

export const BASE_URL = import.meta.env.DEV
    ? "http://localhost:3001"
    : "https://baddies-api.onrender.com"

export type ProfileUser = {
    id: number
    pseudo: string
    email: string
    avatar_url: string | null
}
export type ApiMessageResponse = {
    title: string
    status: number
    detail: string
}
export type ProfileUpdate = {
    pseudo?: string
    email?: string
    avatar_url?: string
    password?: string
}

type ApiError = {
    title?: string
    detail?: string
    message?: string
    error?: string
}

type AuthResponse = {
    accessToken: string
    refreshToken: string
    user: ProfileUser
}

type RegisterResponse = {
    token: string
    user: ProfileUser
}

type RefreshResponse = {
    accessToken: string
    refreshToken: string
}

// Extraire les messages d'erreur du backend
const getErrorMessage = (
    data: ApiError | null,
    status: number
): string => {
    return (
        data?.detail ||
        data?.title ||
        data?.message ||
        data?.error ||
        `Erreur HTTP : ${status}`
    )
}

// Lire une réponse JSON
const readJson = async <T>(
    response: Response
): Promise<T> => {
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data as ApiError | null, response.status)
        )
    }

    return data as T
}

// Enregistrer les tokens
const saveTokens = (
    accessToken: string,
    refreshToken: string
): void => {
    localStorage.setItem('token', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}

// Effacer la session locale
const clearSession = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
}

const sessionExpired = (): Error => {
    clearSession()
    notifySessionExpired()

    return new Error(SESSION_EXPIRED_MESSAGE)
}


// Une seule opération de refresh à la fois
let refreshPromise: Promise<string> | null = null

const refreshAccessToken = async (): Promise<string> => {
    if (refreshPromise) {
        return refreshPromise
    }

    refreshPromise = (async () => {
        const refreshToken = localStorage.getItem('refreshToken')

       if (!refreshToken) {
            throw sessionExpired()
        }

        let response: Response

        try {
            response = await fetch(
                `${BASE_URL}/api/v1/auth/refresh`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: refreshToken
                    })
                }
            )
        } catch {
            throw new Error(
                'Impossible de contacter le serveur.'
            )
        }

if (!response.ok) {
    if (response.status === 400 || response.status === 401) {
        throw sessionExpired()
    }

    const data = await response.json().catch(() => null)

    throw new Error(
        getErrorMessage(data, response.status)
    )
}

        const data = await response.json() as RefreshResponse

        if (
            typeof data.accessToken !== 'string' ||
            typeof data.refreshToken !== 'string'
        ) {
            throw new Error(
                'Réponse de renouvellement invalide.'
            )
        }

        // IMPORTANT : sauvegarder les DEUX nouveaux tokens
        saveTokens(data.accessToken, data.refreshToken)

        return data.accessToken
    })()

    try {
        return await refreshPromise
    } finally {
        refreshPromise = null
    }
}

// Envoyer une requête authentifiée
export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    let accessToken = localStorage.getItem('token')

    if (!accessToken) {
        throw new Error('Veuillez vous connecter.')
    }

    const sendRequest = (token: string): Promise<Response> => {
        const headers = new Headers(options.headers)

        headers.set('Authorization', `Bearer ${token}`)

        return fetch(url, {
            ...options,
            headers
        })
    }

    let response = await sendRequest(accessToken)

    if (response.status === 401) {
        // Une autre requête a peut-être déjà renouvelé
        // le token entre-temps
        const currentToken = localStorage.getItem('token')

        if (currentToken && currentToken !== accessToken) {
            accessToken = currentToken
        } else {
            accessToken = await refreshAccessToken()
        }

        // Réessayer une seule fois
        response = await sendRequest(accessToken)
    }

    return response
}

// SERVICES API
export const apiService = {

    // POSTS
    async getPosts(signal: AbortSignal) {
        const response = await fetch(
            `${BASE_URL}/posts`,
            { signal }
        )

        return readJson(response)
    },

    // CONNEXION
    async login(
        email: string,
        password: string,
        signal: AbortSignal
    ): Promise<AuthResponse> {
        const response = await fetch(
            `${BASE_URL}/api/v1/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                signal
            }
        )

        const data = await readJson<AuthResponse>(response)

        if (
            typeof data.accessToken !== 'string' ||
            typeof data.refreshToken !== 'string'
        ) {
            throw new Error('Réponse de connexion invalide.')
        }

        saveTokens(data.accessToken, data.refreshToken)

        return data
    },

    // INSCRIPTION
    async register(
        email: string,
        password: string,
        pseudo: string,
        signal: AbortSignal
    ): Promise<RegisterResponse> {
        const response = await fetch(
            `${BASE_URL}/api/v1/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pseudo,
                    email,
                    password
                }),
                signal
            }
        )

        const data = await readJson<RegisterResponse>(response)

        // Le backend retourne un JWT mais pas de refresh token
        // Il est préférable de rediriger vers la connexion
        // après inscription.
        return data
    },

    // MOT DE PASSE OUBLIÉ
    async forgotPassword(
    email: string,
    signal: AbortSignal
): Promise<ApiMessageResponse> {
    const response = await fetch(
        `${BASE_URL}/api/v1/auth/forgotPassword`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
            signal
        }
    )

    return readJson<ApiMessageResponse>(response)
},

    // RÉINITIALISATION DU MOT DE PASSE
    async resetPassword(
        token: string,
        newPassword: string,
        signal: AbortSignal
    ) {
        const response = await fetch(
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

        return readJson(response)
    },

    // MODIFICATION DU PROFIL
    async updateProfile(
        profile: ProfileUpdate
    ): Promise<ProfileUser> {
        const response = await fetchWithAuth(
            `${BASE_URL}/api/v1/user/profile`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            }
        )

        const data = await readJson<{
            user: ProfileUser
        }>(response)

        const user = data?.user

        if (
            !user ||
            !Number.isSafeInteger(Number(user.id)) ||
            typeof user.pseudo !== 'string' ||
            typeof user.email !== 'string' ||
            !(
                user.avatar_url === null ||
                typeof user.avatar_url === 'string'
            )
        ) {
            throw new Error(
                'Réponse du serveur invalide.'
            )
        }

        // Un changement de mot de passe révoque
        // les refresh tokens côté backend.
        if (profile.password !== undefined) {
            clearSession()
        }

        return user
    },

    // DÉCONNEXION
    async logout(): Promise<void> {
        const refreshToken =
            localStorage.getItem('refreshToken')

        try {
            if (refreshToken) {
                await fetch(
                    `${BASE_URL}/api/v1/auth/logout`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: refreshToken
                        })
                    }
                )
            }
        } finally {
            clearSession()
        }
    }
}
