import React from 'react'
import '../../style/Hotel/HotelImg.scss'

const HotelImg = ({ images = [] }) => {
    if (images.length === 0) {
        return <div>No image</div>
    }
    return (
        <>
            <div className='container'>
                <div className='row g-2'>
                    <div className='col-lg-6'>
                        <img src={images[0]} alt='LargeImage' className='main-image' />
                    </div>
                    <div className='col-lg-6 row g-2'>
                        {images
                            .filter((_, index) => {
                                return index > 0
                            })
                            .map((image) => {
                                return (
                                    <div key={image} className='col-lg-6'>
                                        <img src={image} alt='LargeImage' className='small-image' />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelImg
