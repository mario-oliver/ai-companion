'use client';
import BotAvatar from '@/components/BotAvatar';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { BeatLoader } from 'react-spinners';

//exporting to have access to this type of interface in the ChatMessages -> props interface instead of the any interface
export interface ChatMessageProps {
    role: 'system' | 'user';
    content?: string;
    isLoading?: boolean;
    src?: string;
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
    const { toast } = useToast();
    const { theme } = useTheme();

    const onCopy = () => {
        //able to copy messages if written by our ai companion
        if (!content) return; //can have a loading message that has no content

        navigator.clipboard.writeText(content);
        toast({
            description: 'Message copied to clipboard',
        });
    };
    return (
        //hover functionality works here by adding a group label to the parent div and then in the child objects (content, loader, button) allowing the hover to change the opacity from 0 to 100 (unseen to visible)
        <div
            className={cn(
                'group flex items-start gap-x-3 py-4 w-full',
                role === 'user' && 'justify-end'
            )}
        >
            {role !== 'user' && src && <BotAvatar src={src} />}
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                {isLoading ? (
                    <BeatLoader
                        color={theme === 'light' ? 'black' : 'white'}
                        size={5}
                    />
                ) : (
                    content
                )}
            </div>
            {role === 'user' && <UserAvatar />}
            {role !== 'user' && !isLoading && (
                <Button
                    onClick={onCopy}
                    className="opacity-0 group-hover:opacity-100 transition "
                    size="icon"
                    variant="ghost"
                >
                    <Copy className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default ChatMessage;
