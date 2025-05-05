export const changeUserName = async (username: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action/change-username`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
    })

    return res.ok
}

export async function deleteUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action`, {
        method: "DELETE"
    })

    return res.ok
}