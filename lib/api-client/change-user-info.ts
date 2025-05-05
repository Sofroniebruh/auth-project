export const changeUserName = async (username: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/change-username`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
    })

    return res.ok
}