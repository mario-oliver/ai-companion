import { auth } from '@clerk/nextjs';
import prismadb from './prismadb';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) return false;

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId,
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true,
        },
    });

    //never had a usersubscritpion
    if (!userSubscription) return false;

    //giving one extra day of grace period
    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS;

    return !!isValid;
};
