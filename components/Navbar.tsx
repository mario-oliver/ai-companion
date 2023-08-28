'use client';

import { Menu, Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { UserButton } from '@clerk/nextjs';

//this import comes from the lib folder from chadui
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ModeToggle } from './theme-toggle';
import MobileSidebar from './MobileSidebar';
import { useProModal } from '@/hooks/use-pro-modal';

const fontMine = Poppins({
    weight: '600',
    subsets: ['latin'],
});

interface NavbarProps {
    isPro: boolean;
}

const Navbar = ({ isPro }: NavbarProps) => {
    const proModal = useProModal();

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/">
                    <h1
                        className={cn(
                            'hidden md:block text-xl md:text-3xl font-bold primary',
                            fontMine.className
                        )}
                    >
                        companion.ai
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {!isPro && (
                    <Button
                        size="sm"
                        variant="premium"
                        onClick={proModal.onOpen}
                    >
                        <Sparkles className="h-4 w-4 fill-white text-white" />{' '}
                        Upgrade
                    </Button>
                )}
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;
