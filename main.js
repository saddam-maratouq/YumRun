
// Start preloader // 


let loadingPage = document.getElementById('loading') 



function getLoading() {

    setTimeout(() => {
        loadingPage.style.display = 'none'
    }, 2000);

}

getLoading(); 

// End 


// Arrow up on page 

const arrowScroollUp = document.getElementById('link-scroll') 


window.addEventListener('scroll' , () => {
    // 
    if (window.pageYOffset > 20) {
        console.log(window.pageYOffset); // scroll y space 
        
        arrowScroollUp.classList.add('active') 
    }
    else {
        arrowScroollUp.classList.remove('active') 
    }
})


// 





// Active link on click 

let linkElments = document.querySelectorAll('nav ul li') 

console.log('linkElments is', linkElments);  


linkElments.forEach( link => { 

 
    
    link.addEventListener( 'click' , () => {     
    
     // find first elment has this class name in entire dom ...            
    document.querySelector('.active-link')?.classList.remove('active-link') // ✅ no error, just skips

    link.classList.add('active-link')    

    } )
} )





// 








// Text Animation script 

// let  textWrapper = document.querySelector('.title');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


// anime.timeline({loop: true})
//   .add({
//     targets: '.title .letter',
//     scale: [4,1],
//     opacity: [0,1],
//     translateZ: 0,
//     easing: "easeOutExpo",
//     duration: 950,
//     delay: (el, i) => 70*i
//   }).add({
//     targets: '.title',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 2000
//   });

// 



// Show hide Nav menu // 

const navMenu = document.querySelector('nav ul') 
// console.log(navMenu);
 
 const navLinks = document.querySelector('.nav-links') 


const closeIconNav  =  document.querySelector('.berger-menu .fa-xmark')


const openIconNav =  document.querySelector('.berger-menu .fa-bars-staggered')
// console.log(openIconNan);


function showHideNavMenu() {
    navLinks.classList.toggle('active') 
    navMenu.classList.toggle('active');


    // check status 
    // console.log( 'open mode dsiplay none = ', openIconNav.style.display === 'none'); 
    // console.log( 'close mode display none = ' , closeIconNav.style.display === 'none');
    

    closeIconNav.style.display = openIconNav.style.display === 'none' ? 'none' : 'block';
    openIconNav.style.display = closeIconNav.style.display === 'none' ? 'block' : 'none';


}

// End  // 




// Sign up form close  and show // 


const signModal = document.getElementById('signUp-modal') 


function hideModal(displayMode) {
    signModal.style.display = displayMode
}

function  showModal(displayMode) {
    signModal.style.display = displayMode 
}


//



// show hide video pop up 

const btnPlayVideo = document.getElementById('popUpVideo') ;

const videoPopUp = document.getElementById('videoContent')
console.log(videoPopUp);



function popUpVideo() { 
    videoPopUp.classList.add('show-video')
}

function closeVideoPopUp(params) {
    videoPopUp.classList.remove('show-video')
}




// End pop up video show hide 




// Drak mode // 

const  sunIcon = document.getElementById('sun-icon')
// console.log(sunIcon);


const  moonIcon = document.getElementById('moon-icon')
// console.log(moonIcon);


const bodyTag = document.getElementById('body')



function tougleMoonSunIcon() {

!(bodyTag.classList.contains('dark-mode')) ?  
enableDrakMode() : enableLightMode() 

}



function enableDrakMode() {
    moonIcon.style.display = 'none'
    sunIcon.style.display = 'block'   
    document.getElementById('body').classList.add('dark-mode');
}



function enableLightMode() {
    moonIcon.style.display = 'block'
    sunIcon.style.display = 'none'  
    document.getElementById('body').classList.remove('dark-mode')
}




// // Owl  Carsoul 

// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     dots : true,
//     autoplayHoverPause : true,
//     items : 1 ,
//     autoplay : true,
//     autoplayTimeout : 5000,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:1
//         },
//         1000:{
//             items:2
//         }
//     }
// })



// // 