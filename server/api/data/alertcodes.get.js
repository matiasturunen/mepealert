import { alertCodes } from "~/server/alertcodes";

export default defineEventHandler(() => {
    return { codes: alertCodes }
})
