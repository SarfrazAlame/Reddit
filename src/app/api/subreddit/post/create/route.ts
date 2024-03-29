import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Postvalidators } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Response) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json()

        const { subredditId, title, content } = Postvalidators.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id
            }
        })

        if (!subscriptionExists) {
            return new Response('Subscribe to post.', { status: 400 })
        }

       await db.post.create({
        data:{
            title,
            content,
            authorId:session.user.id,
            subredditId
        }
       })

        return new Response('Ok')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }

        return new Response('could not post to subreddit at this time, please try again later', { status: 500 })
    }
}