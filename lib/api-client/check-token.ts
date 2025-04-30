export const checkToken = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/check-token`, {
        method: "GET",
    })

    return response.ok;
}