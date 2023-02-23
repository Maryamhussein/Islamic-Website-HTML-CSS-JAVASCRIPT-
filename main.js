//Header Background Change During Scroll
let bgHeader=document.querySelector('#header');
let scrollbtn=document.querySelector('.scrollBtn')
window.addEventListener('scroll' , ()=>{
    if(window.scrollY > 100){
        bgHeader.classList.add('active')
    }
    else{
        bgHeader.classList.remove('active')
    }
    //display Scroll button
    window.scrollY > 500? scrollbtn.classList.add('active'):scrollbtn.classList.remove('active')
})
//Section Scroll Using Javascript
const sections=document.querySelectorAll('section');
let links=document.querySelectorAll('#header ul li');
console.log(links)
links.forEach((link)=>{
    link.addEventListener('click' ,()=>{
        document.querySelector('#header ul li.active').classList.remove('active');
        link.classList.add('active')
        let targetSection=link.getAttribute('data-filter')
        sections.forEach((section)=>{
            if(section.classList.contains(targetSection))
            section.scrollIntoView({
                behavior:'smooth'
            })
        })
    })
})

//Hadith Function
const hadithContent=document.querySelector('.hadith-content');
const prevBtn=document.querySelector('.prev')
const nextBtn=document.querySelector('.next')
const numberBtn=document.querySelector('.number')
let hadithIndex=0;
function getHadith(){
    const apiUrl = 'https://hadithapi.com/api/hadiths?apiKey=$2y$10$YX5pmcfsNF2OmzAdTk4T1rcHXCkDfTcl7h5m3ZH1dR2EOXr0';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let hadthData=data.hadiths.data
         hadithContent.innerHTML= hadthData[hadithIndex].hadithArabic
        numberBtn.innerText=`25 - ${hadithIndex + 1}`
    })
    .catch(error => {
        console.log(error);
    })
}
getHadith()


//Quarn Function
function getQuranSurah(){
    let popup=document.querySelector('.surah-popup')
    let closebtn=document.querySelector('.close')
    fetch('http://api.alquran.cloud/v1/meta')
    .then(response =>response.json()
        ).then(data =>{
            let surahContainer=document.querySelector('.surahContainer');
            surahContainer.innerHTML=''
            let surahInfo=data.data.surahs.references;
            for( let surah of surahInfo){
               // console.log(surah)
                surahContainer.innerHTML+=`
                <div class="surah">
                <h3>${surah.number}</h3>
                <p>${surah.name}</p>
                <p>${surah.englishName}</p>
                 </div>
                `
            } 
            let allSurahs=document.querySelectorAll('.surah')
            allSurahs.forEach((surah,index) =>{
                surah.addEventListener('click' ,()=>{
                    popup.classList.add('active')
                     getAyat(index)
                })
                })
           
        })
        closebtn.addEventListener('click',()=>{
            popup.classList.remove('active')
        })
}
getQuranSurah()

//Get Surahs Ayat
function getAyat(surahIndex){
    let ayatContainer=document.querySelector('.ayats')
    ayatContainer.innerHTML=''
    fetch(`http://api.alquran.cloud/v1/surah/${surahIndex+1}`).
    then(response=>response.json())
    .then(data =>{
      let ayat=data.data.ayahs
      console.log(ayat)
      for(let ayah of ayat){
        ayatContainer.innerHTML+=
        `<span>${ayah.text} (${ayah.numberInSurah})</span>`   
      }
      
    }) 
  
}

//Salah Timing Function
function getPrayTime(){
let prayContainer=document.querySelector('.prayContainer');
prayContainer.innerHTML=""

fetch('http://api.aladhan.com/v1/timingsByCity/21-02-2023?city=Riyadh&country=Saudi+Arabia&method=8').then(response => response.json()).then((data) =>{
    let times=data.data.timings;
    console.log(times)
            let content= `
        <div class="prayTime">
                    <h3>الشروق</h3>
                    <p>${times.Sunset}</p>
                </div>
                <div class="prayTime">
                    <h3>الفجر</h3>
                    <p>${times.Fajr}</p>
                </div>
                <div class="prayTime">
                    <h3>الظهر</h3>
                    <p>${times.Dhuhr}</p>
                </div>
                <div class="prayTime">
                    <h3>العصر</h3>
                    <p>${times.Asr}</p>
                </div>
                <div class="prayTime">
                    <h3>المغرب</h3>
                    <p>${times.Maghrib}</p>
                </div>
                <div class="prayTime">
                    <h3>العشاء</h3>
                    <p>${times.Isha}</p>
                </div>
        `
        prayContainer.innerHTML=content
})
}
getPrayTime()

//prev event
prevBtn.addEventListener('click' ,()=>{
    hadithIndex == 0 ? hadithIndex=24 :hadithIndex--
    getHadith()
})
//next event
nextBtn.addEventListener('click' ,()=>{
    hadithIndex ==24 ? hadithIndex=0 :hadithIndex++
    getHadith()
})
//Explorer Button event
const explore=document.getElementById('explore');
const hadithSection=document.querySelector('.hadith')
explore.addEventListener('click' ,()=>{
    hadithSection.scrollIntoView({
        behavior:'smooth'
    })
})
//Scroll Button
scrollbtn.addEventListener('click' ,()=>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
})
//responsive Website Menu
let bars=document.querySelector('.bars')
let list =document.querySelector('header ul')
bars.addEventListener('click',()=>{
    list.classList.toggle('active')
})