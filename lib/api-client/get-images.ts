export const GetProfileImage = async (): Promise<string> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/get-profile-picture`, {
        method: "GET",
    })

    if (res.ok) {
        const image = (await res.json()) as { link: string }
        return image.link;
    }

    throw new Error(res.statusText);
}