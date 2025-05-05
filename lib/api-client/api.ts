import * as tokenCheck from "./check-token"
import * as auth from "./authenticate"
import * as passwordActions from "./password-reset"
import * as uploadImage from "./upload-public-image"
import * as getUserInfo from "./get-user-info"
import * as changeUserInfo from "./change-user-info"

export const API = {
    tokenCheck,
    auth,
    passwordActions,
    uploadImage,
    getUserInfo,
    changeUserInfo,
}