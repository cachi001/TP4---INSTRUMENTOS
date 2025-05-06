import { Header } from './Header'
import { Mapa } from './Mapa'

export const DondeEstamos = () => {
    return (
        <div>
            <Header></Header>
            <section>
                        <div className='flex py-6 justify-center'>
                            <div className='lg:w-300 w-300 flex justify-center p-6 flex-col gap-6 items-center'>
                                <span className='lg:text-4xl font-bold text-[#2B2D42] pl-4'>DÓNDE ESTAMOS</span>
                            </div>
                        </div>
                        <div className='h-130 mb-20'>
                            <Mapa />
                        </div>
            </section>
        </div>
    )
}

export default DondeEstamos