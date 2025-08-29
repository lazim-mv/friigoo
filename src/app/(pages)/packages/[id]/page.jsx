import React from 'react'
import img1 from '../../../../../public/trek/8.webp'
import Section1 from '../../components/Section1'
import Itenary from '../components/Itenary'
import { createClient } from '@supabase/supabase-js'
import { PackageSearch } from 'lucide-react'
import { notFound } from 'next/navigation'

// Create supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

async function getPackage(id) {
    try {
        const { data, error } = await supabase
            .from('travel_packages')
            .select(`
                *,
                travel_package_days (*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Database error:', error.message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching package:', error);
        return null;
    }
}

const page = async ({ params }) => {
    const { id } = await params;
    const data = await getPackage(id);

    // If package not found, show 404
    if (!data) {
        notFound();
    }

    // Check if package data is incomplete
    const hasValidData = data && data.destination && data.shortdescription;

    if (!hasValidData) {
        return (
            <div>
                <Section1
                    heading="Package Details"
                    subHeading="Loading package information..."
                    img={img1}
                />
                <div className="h-[50vh] flex flex-col items-center justify-center w-full text-gray-500 px-8">
                    <PackageSearch size={60} className="mb-4 text-gray-400" />
                    <h2 className="text-xl font-semibold">Package Information Unavailable</h2>
                    <p className="text-sm text-center mt-2">
                        We're having trouble loading this package details. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Section1
                heading={data.destination}
                subHeading={data.shortdescription}
                img={img1}
            />
            <div className='pb-24 md:bg-[#f3f2ee]'>
                <Itenary
                    travelPackage={
                        data?.travel_package_days?.length > 0
                            ? data.travel_package_days
                            : []
                    }
                />
            </div>
        </div>
    )
}

export default page