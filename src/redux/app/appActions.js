import { FULL_HEIGHT_PAGE, LOGIN_VISIBLE } from "./appTypes"


export const loginVisible = (visible) => {
    return {
        type: LOGIN_VISIBLE,
        visible: visible
    }
}

export const fullPage = (bool) => {
    return {
        type: FULL_HEIGHT_PAGE,
        fullheightpage: bool
    }
}