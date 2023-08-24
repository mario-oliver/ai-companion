import CompanionForm from '@/components/CompanionForm';
import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

interface CompanionIdPageProps {
    params: {
        companionId: string;
    };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
    //TODO: Check subscription status
    const { userId } = auth();

    if (!userId) return redirectToSignIn();

    const companion = await prismadb.companion.findUnique({
        where: {
            userId,
            id: params.companionId,
        },
    });

    const categories = await prismadb.category.findMany();
    return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
