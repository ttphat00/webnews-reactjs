import React from 'react';
import { useEffect } from 'react';

function ScrollUp() {

    function scrollUpVisible(){
        var scrollupElement = document.querySelector('.scroll-up');
        if(this.pageYOffset > 770){
            if(!scrollupElement.classList.contains('scroll-up-visible')){
                scrollupElement.classList.add('scroll-up-visible');
            }
        }else{
            if(scrollupElement.classList.contains('scroll-up-visible')){
                scrollupElement.classList.remove('scroll-up-visible');
            }
        }
    }

    function scrollToUp(){
        if(document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0){
            window.scrollBy(0,-100);
            var timeout = setTimeout(scrollToUp,10);
        }else{
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',scrollUpVisible);
    }, []);

    return (
        <>
        <button className="scroll-up" onClick={scrollToUp}><i className="fa fa-arrow-up"></i></button>
        </>
    );
}

export default ScrollUp;
