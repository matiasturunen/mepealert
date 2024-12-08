export default defineEventHandler(() => {
    const accessToken = process.env.TOKEN || '';

    return { token: accessToken }
})