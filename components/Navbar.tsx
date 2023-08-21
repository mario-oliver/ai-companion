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

const fontMine = Poppins({
  weight: '600',
  subsets: ['latin'],
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary-10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
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
        <Button size="sm" variant="premium">
          <Sparkles className="h-4 w-4 fill-white text-white" /> Upgrade
        </Button>
        <ModeToggle />
        <UserButton></UserButton>
      </div>
    </div>
  );
};

export default Navbar;
