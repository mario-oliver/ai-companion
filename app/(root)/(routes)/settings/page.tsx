import { checkSubscription } from '@/lib/subscription';
import React from 'react';
import SubscriptionButton from '@/components/SubscriptionButton';
import VideoProcessingButton from '@/components/VideoProcessingButton';

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return (
        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-medium">Settings</h3>
            <div className="text-muted-foreground text-sm">
                {isPro
                    ? 'You are currently on a Pro plan'
                    : 'You are currently on a free plan'}
            </div>
            <SubscriptionButton isPro={isPro} />
            {/* <VideoProcessingButton /> */}
        </div>
    );
};

export default SettingsPage;
