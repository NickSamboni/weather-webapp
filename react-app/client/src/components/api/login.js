const ENDPOINT = 'http://localhost:4000'

export default async function login ({ email, password }) {
    const res = await fetch(`${ENDPOINT}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok)
        throw new Error('Response is NOT ok')
    const res_2 = await res.json()
    const { jwt } = res_2
    return jwt
}