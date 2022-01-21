import React from 'react'
import { Carousel } from 'react-bootstrap'
import image1 from '../Images/image-1.jpg'
import image2 from '../Images/image-2.jpg'
import image3 from '../Images/image-3.jpg'
import image4 from '../Images/image-6.jpg'
import image5 from '../Images/image-5.jpg'
function Slider() {
    return (
        <Carousel className="home-slider">
            <Carousel.Item interval={2000}>
                <img className="d-block w-100" src={image1} alt="..." />
                <Carousel.Caption>
                    <h3>Share Your Photos</h3>
                    <h3>Create Your Own Gallery</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100" src={image2} alt="..." />
                <Carousel.Caption>
                    <h3>Share Your Photos</h3>
                    <h3>Create Your Own Gallery</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100" src={image3} alt="..." />
                <Carousel.Caption>
                    <h3>Share Your Photos</h3>
                    <h3>Create Your Own Gallery</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100" src={image4} alt="..." />
                <Carousel.Caption>
                    <h3>Share Your Photos</h3>
                    <h3>Create Your Own Gallery</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100" src={image5} alt="..." />
                <Carousel.Caption>
                    <h3>Share Your Photos</h3>
                    <h3>Create Your Own Gallery</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider
