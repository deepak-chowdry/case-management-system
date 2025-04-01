"use client"
import { usePathname } from 'next/navigation';
import React, { ReactNode, Suspense } from 'react'
import SideBar from './SideBar';

interface ClientLayoutProps {
    children: ReactNode; // Type the `children` prop as ReactNode
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
    const pathname = usePathname();
    const authRoutes = ["/handler/sign-up"];
    const isAuthRoute =
        authRoutes.includes(pathname)
    return (
        <div>
            {!isAuthRoute ? (
                <>
                    <div className="flex items-center justify-between w-full h-full">
                        <Suspense fallback={<></>}>
                            <SideBar />
                        </Suspense>
                        <div className="w-4/5">
                            {children}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {children}
                </>
            )}
        </div>
    )
}

export default ClientLayout