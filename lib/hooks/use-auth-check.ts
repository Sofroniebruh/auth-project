import {NextRequest} from "next/server";
import {verifyJWT} from "@/lib/auth";

interface Props {
    request: NextRequest
}

export const useAuthCheck = ({request}: Props) => {
    try {
        const token = request.cookies.get('auth-token')?.value;

        return verifyJWT(token || '');
    } catch {
        return null
    }
}