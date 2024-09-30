import User from "@app/models/user";
import { connectToDb } from "@utils/database";

export const GET = async (request, { params }) => {

    const { username } = params
    console.log('este es el usuario', username)
    try {
        await connectToDb()

        const user = await User.findOne({ username })

        if (!user) {
            return new Response('User not found', { status: 404 })
        } else {
            return new Response(JSON.stringify(user), { status: 200 })
        }


    } catch (error) {
        return new Response("Failed to fetch the user", { status: 500 })
    }
} 