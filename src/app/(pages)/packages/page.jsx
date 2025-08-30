import React from 'react'
import Section1 from '../components/Section1'
import img1 from '../../../../public/about-page/6.webp'
import PackageCard from '@/app/components/common/card/Card'
import ContactForm from '@/app/components/common/ContactForm'
import Testimonials from '@/app/components/Testimonials'
import { createClient } from '@supabase/supabase-js'
import { PackageSearch } from 'lucide-react'

export const revalidate = 0;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const page = async () => {
    let packages = [];
    let hasError = false;

    try {
        const { data, error } = await supabase
            .from('travel_packages')
            .select(`
                *,
                travel_package_days (*)
            `)
            .order('created_at', { ascending: false })
            .order('day', { foreignTable: 'travel_package_days', ascending: true })

        if (error) {
            console.error('Database error:', error.message);
            hasError = true;
        } else {
            packages = data || [];
        }
    } catch (error) {
        console.error('Page error:', error);
        hasError = true;
    }

    // Check if packages array is empty or there's an error
    const showEmptyState = hasError || !Array.isArray(packages) || packages.length === 0;

    return (
        <div>
            <Section1
                heading='Tailored Travel Packages'
                subHeading='Choose from a variety of thoughtfully designed packages that turn your travel dreams into reality.'
                img={img1}
            />

            {showEmptyState ? (
                <div className="h-[50vh] flex flex-col items-center justify-center w-full text-gray-500 px-8">
                    <PackageSearch size={60} className="mb-4 text-gray-400" />
                    <h2 className="text-xl font-semibold">
                        {hasError ? 'Unable to Load Packages' : 'No Packages Found'}
                    </h2>
                    <p className="text-sm text-center mt-2">
                        {hasError
                            ? 'We encountered an issue loading packages. Please try again later.'
                            : 'Try exploring other packages or check back later.'
                        }
                    </p>
                </div>
            ) : (
                <PackageCard
                    btn={false}
                    travelPackages={packages}
                />
            )}

            <ContactForm />
            <Testimonials />
        </div>
    )
}

export default page