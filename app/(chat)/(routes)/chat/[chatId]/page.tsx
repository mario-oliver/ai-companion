import { auth, redirectToSignIn } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import React from 'react';
import { redirect } from 'next/navigation';
import ChatClient from './components/client';

//note that the access to the URL parameter is NOT a search or query param
interface ChatIdPageProps {
    params: {
        chatId: string;
    };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
    const { userId } = auth();

    if (!userId) return redirectToSignIn();

    const companion = await prismadb.companion.findUnique({
        where: { id: params.chatId },
        include: {
            messages: {
                //order the messages in ascending order where (by) the userId matches the auth userId
                orderBy: {
                    createdAt: 'asc',
                },
                where: {
                    userId,
                },
            },
            _count: {
                select: {
                    messages: true,
                },
            },
        },
    });

    if (!companion) {
        return redirect('/');
    }

    return <ChatClient companion={companion} />;
};

export default ChatIdPage;
