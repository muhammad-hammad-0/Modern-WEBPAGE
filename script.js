const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnim(){
    let tl = gsap.timeline();

    tl.from(".nav",{
        y:'-10',
        opacity:0,
        duration:1,
        ease: Expo.easeInOut
    });
    
    tl.to(".belem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.1,
    });

    tl.from(".homeFooter", {
        y:'-10',
        opacity:0,
        duration: 0.5,
        // delay: 0.2,
        ease:Expo.easeInOut
    })
}

let timeout;

function mouseskew(){
    // Default value of scale is 1 on both x and y
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;


    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.8, 1.2 ,xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2 ,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemove(xscale,yscale);
        timeout = setTimeout(function (){
            document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
        
    });
}

function circlemove(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} ,${yscale})`;
    })
}

document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Expo.easeInOut
        });
    });
});

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0; // Initialize rotate outside the event listener
    var rdiff = 0; // Initialize rdiff outside the event listener

    elem.addEventListener("mousemove", function(details){
        rdiff = details.clientX - rotate; // Calculate difference in mouse movement
        rotate = details.clientX; // Update rotate for next iteration

        var topd = details.clientY - elem.getBoundingClientRect().top;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: topd,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, rdiff * 0.3) // Apply rotation based on mouse movement difference
        });
    });
});

circlemove();
firstPageAnim();
mouseskew();
