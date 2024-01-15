import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubsriptionValidators } from "@/lib/validators/subreddit";

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

        if (subscriptionExists) {
            return new Response('You are already subscription to this subreddit.')
        }
    } catch (error) {

    }
}