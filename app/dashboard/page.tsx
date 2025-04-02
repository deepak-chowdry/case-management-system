import UploadFile from '@/components/UploadFile'
import Image from 'next/image'

const DashboardPage = () => {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='w-11/12 md:w-[98%] h-screen py-3'>
        <div className=''>
          <h2 className='text-xl font-medium'>Welcome to Dashboard</h2>
        </div>
        <UploadFile />

      </div>
    </div>
  )
}

export default DashboardPage