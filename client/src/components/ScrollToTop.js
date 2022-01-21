import React, {useState, useEffect} from 'react'

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const toggleVisible = () => {
            if(window.pageYOffset > 300){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        }
        window.addEventListener("scroll", toggleVisible);

        return () => window.removeEventListener("scroll" ,toggleVisible);
    })

    
    return (
        <>
        {
            isVisible && (
                <button title='scroll top' className='scroll-to-top' onClick={scrollToTop}>
                    <i className="fas fa-angle-up "></i>
                </button>
            )
        }
        </>
    )
}

export default ScrollToTop
