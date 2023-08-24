import React, { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormProps {
    input: string;
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => void;
    onSubmit: (
        e: FormEvent<HTMLFormElement>,
        chatRequestOptions?: ChatRequestOptions | undefined
    ) => void;
    isLoading: boolean;
}

const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading,
}: ChatFormProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className="border-t border-primary/10 flex items-center gap-x-2 pt-5"
        >
            <Input
                disabled={isLoading}
                value={input}
                placeholder="Type a message"
                onChange={handleInputChange}
                className="rounded-lg bg-primary/10"
            />
            <Button disabled={isLoading} variant="ghost">
                <SendHorizonal className="h-6 w-6" />
            </Button>
        </form>
    );
};

export default ChatForm;
