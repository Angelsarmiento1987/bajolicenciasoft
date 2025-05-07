

import React from 'react';
import { MenuNav } from '../../Components/MenuNav/MenuNav';
import '../Home/Home.css'
import Lottie from 'lottie-react';
import animationData from '../../Lottie/Animation - 1746585232526.json'

const Home = () => {
    return(
<>
        <MenuNav/>
        <div className='contGralHome'>
                <div>
                   <h1 className='titHome'>Bajo Licencia</h1>
                   <h1 className='titHome2'>Soft</h1>
                </div>

                <div>
                <Lottie animationData={animationData} loop={true} className='lottieImg' />
                </div>
        </div>

</>
    )
}

export { Home }