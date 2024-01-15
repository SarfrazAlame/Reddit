import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubsriptionValidators } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Response) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json()

        const { subredditId } = SubredditSubsriptionValidators.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id
            }
        })

        if (!subscriptionExists) {
            return new Response('You are not subscribe to this subreddit.', { status: 400 })
        }

        // check if user is th e creator of the subreddit

        const subreddit = await db.subreddit.findFirst({
            where: {
                id: subredditId,
                creatorId: session.user.id
            }
        })

        if (subreddit) {
            return new Response("You can't unsubscribe from your own subreddit")
        }

        await db.subscription.delete({
            where: {
                userId_subredditId: {
                    subredditId,
                    userId: session.user.id
                }
            }
        })

        return new Response(subredditId)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }

        return new Response('Could not subscribe', { status: 500 })
    }
}