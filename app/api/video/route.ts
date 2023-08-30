import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { videoProcess } from '@/lib/video';

export async function GET() {
    // const { userId } = auth();
    // const user = await currentUser();

    // if (!userId || !user) {
    //     return new NextResponse('Unauthorized', { status: 401 });
    // }

    // const userSubscription = await prismadb.userSubscription.findUnique({
    //     where: {
    //         userId,
    //     },
    // });

    try {
        console.log(videoProcess());
        return NextResponse.json({ message: 'This Worked', success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false });
    }
}
