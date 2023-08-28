'use client';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from './ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import axios from 'axios';

const ProModal = () => {
    const proModal = useProModal();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    //prevents promodal from causing hydration issues, on server side is Mounted is false. Once we are on client side, it is save to show the modal
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe');

            window.location.href = response.data.url;
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to Pro
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        Create{' '}
                        <span className="text-sky-500 mx-1 font-medium">
                            Custom AI
                        </span>{' '}
                        Companions!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9{' '}
                        <span className="text-sm font-normal"> .99 / mo</span>
                    </p>
                    <Button
                        onClick={onSubscribe}
                        disabled={loading}
                        variant="premium"
                    >
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
