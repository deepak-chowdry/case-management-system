import { UserButton } from '@stackframe/stack'
import SeacrhBox from './SeacrhBox'

const TopBar = () => {
    return (
        <div className='flex items-center justify-center  w-full h-14 shadow-sm shadow-zinc-100 sticky top-0'>
            <div className='w-11/12 flex items-center justify-between'>
                <div className='w-3/4 md:w-1/2'>
                    <SeacrhBox />
                </div>
                <div className=''>
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default TopBar