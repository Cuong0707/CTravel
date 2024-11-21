import React, { useRef } from 'react';

const ScrollToTop = ({ children }) => {
    const listRef = useRef(null);

    const scrollToTop = () => {
        const scrollTop = listRef.current.offsetTop;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    };

    return (
        <>
            <div ref={listRef} onClick={scrollToTop}>
                {children}
            </div>
        </>
    );
};

export default ScrollToTop;
