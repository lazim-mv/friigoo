// components/EnhancedReferrerTracker.tsx (or wherever you prefer to place it)
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EnhancedReferrerTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ref = document.referrer;
        const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

        const hasUtm = searchParams.has('utm_source') || searchParams.has('utm_medium');

        if (typeof window.gtag === 'function' && gaId && !hasUtm) {
            let sessionSource = 'direct';
            let sessionMedium = 'none';
            let sessionCampaign = 'auto_attributed_referrer';

            if (ref) {
                try {
                    const referrerUrl = new URL(ref);
                    const referrerHost = referrerUrl.hostname;

                    if (referrerHost.includes('linkedin.com')) {
                        sessionSource = 'linkedin';
                        sessionMedium = 'social';
                    } else if (referrerHost.includes('facebook.com') || referrerHost.includes('t.co') || referrerHost.includes('twitter.com')) {
                        sessionSource = referrerHost.includes('facebook.com') ? 'facebook' : 'twitter';
                        sessionMedium = 'social';
                    } else if (referrerHost.includes('instagram.com')) {
                        sessionSource = 'instagram';
                        sessionMedium = 'social';
                    } else if (referrerHost.includes('github.com')) {
                        sessionSource = 'github';
                        sessionMedium = 'social';
                    } else {
                        sessionSource = referrerHost;
                        sessionMedium = 'referral';
                    }
                } catch (e) {
                    console.error("Error parsing referrer URL:", e);
                    sessionSource = 'unknown';
                    sessionMedium = 'none';
                }
            }

            window.gtag('event', 'page_view', {
                page_location: window.location.href,
                page_path: window.location.pathname + window.location.search,
                page_title: document.title,
                session_source: sessionSource,
                session_medium: sessionMedium,
                session_campaign: sessionCampaign,
            });
            console.log(`📊 Sent custom page_view to GA: ${sessionSource} / ${sessionMedium}`);
        } else if (!gaId) {
            console.log('⚠️ NEXT_PUBLIC_GA_MEASUREMENT_ID not set');
        } else if (hasUtm) {
            console.log('✅ UTM parameters present, GA will handle attribution automatically.');
        } else {
            console.log('⚠️ gtag not ready.');
        }
    }, [searchParams]);

    return null;
}