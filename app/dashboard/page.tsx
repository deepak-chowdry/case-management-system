import Image from 'next/image'

const DashboardPage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Image src={"/AJ_logo.png"} alt='' width={200} height={200} />
    </div>
  )
}

export default DashboardPage