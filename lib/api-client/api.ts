import * as tokenCheck from "./check-token"
import * as auth from "./authenticate"
import * as passwordActions from "./password-reset"
import * as uploadImage from "./upload-public-image"
import * as getImages from "./get-images"

export const API = {
    tokenCheck,
    auth,
    passwordActions,
    uploadImage,
    getImages,
}