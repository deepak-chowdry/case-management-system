
import { Button } from "@/components/ui/button"
import { stackServerApp } from "@/stack"
import { BriefcaseBusiness, House, Plus, ScrollText, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


const SideBar = async () => {
    const user = await stackServerApp.getUser();
    const links = [
        {
            label: "Home",
            icon: House,
            route: ""
        },
        {
            label: "Cases",
            icon: BriefcaseBusiness,
            route: ""
        },
        {
            label: "Team",
            icon: Users,
            route: ""
        },
        {
            label: "Billing",
            icon: ScrollText,
            route: ""
        },
    ]
    return (
        <div className='bg-amber-50/50 w-1/6 md:w-1/5 flex justify-center h-svh sticky shadow shadow-zinc-100'>
            <div className='flex flex-col justify-between w-10/12 h-[96%]'>
                <div className='h-3/4 space-y-4'>
                    <div className='h-20 flex items-center justify-center md:justify-start w-full'>
                        <Image src={"/AJ_logo.png"} alt='' width={200} height={200} className='w-14 md:w-24' />
                    </div>
                    <div className='w-full space-y-7 flex flex-col items-center'>
                        <div className="space-y-8 md:space-y-0 w-full">
                            {links.map((link) => (
                                <Link key={link.label} href={link.route} className='flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-3.5 px-3 h-fit md:h-14'>
                                    <link.icon strokeWidth={1.25} size={20} color='green' />
                                    <p className='text-xs md:text-sm'>{link.label}</p>
                                </Link>
                            ))}
                        </div>
                        <Button variant="outline" className='w-11/12 border border-zinc-100 cursor-pointer'>
                            <Plus />
                            <p className="hidden md:flex">New</p>
                        </Button>
                    </div>
                </div>
                <div>

                    <div className='h-12 flex items-center gap-4 cursor-pointer justify-center md:justify-start'>
                        <Avatar className='w-8 h-8 md:w-9 md:h-9'>
                            <AvatarImage src={user?.profileImageUrl ?? "https://github.com/shadcn.png"} alt="@shadcn" />
                            <AvatarFallback>{user ? `Hello, ${user?.displayName ?? "anon"}` : 'You are not logged in'}</AvatarFallback>
                        </Avatar>
                        <div className='md:flex flex-col items-start hidden'>
                            <h2 className='font-semibold'>{user ? `${user?.displayName ?? "anon"}` : 'You are not logged in'}</h2>
                            <p className='font-light text-xs leading-3'>{user?.primaryEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar