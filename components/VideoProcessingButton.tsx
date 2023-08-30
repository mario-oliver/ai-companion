'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { videoProcess } from '@/lib/video';
import { useToast } from './ui/use-toast';
import axios from 'axios';

const VideoProcessingButton = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const beginProcessing = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/video');
            console.log(response);
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            disabled={loading}
            variant="ghost"
            size="lg"
            onClick={beginProcessing}
        >
            Processing Video
        </Button>
    );
};

export default VideoProcessingButton;
