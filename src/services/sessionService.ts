export const SESSION_EXPIRED_MESSAGE =
    "Session expirée. Veuillez vous reconnecter."

export const SESSION_EXPIRED_EVENT = "baddies:session-expired"

export function notifySessionExpired(): void {
    window.dispatchEvent(
        new Event(SESSION_EXPIRED_EVENT)
    )
}