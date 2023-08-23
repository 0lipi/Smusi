//getting data from StaticContent.json and parsin it into js-object
var germanData;
var englishData;
var language = 'de';
var currentUrl = window.location.href;

document.getElementById('langBtnDE').addEventListener("click", function(){
    language = 'de';
    changelanguage()
});
document.getElementById('langBtnEN').addEventListener("click", function(){
    language = 'en';
    changelanguage()
});

changelanguage();

function changelanguage(){
    if(language == 'de'){
        //request for getting german language data
        var germanRequest = new XMLHttpRequest();
        germanRequest.open("GET", "../Data/StaticContentGerman.json", true);
        germanRequest.onreadystatechange = function(){
            if (germanRequest.readyState === 4 && germanRequest.status === 200){
                germanData = JSON.parse(germanRequest.responseText);
                processGermanData();
            }
        };
        germanRequest.send();
    }else if(language == 'en'){
        //request for getting english language data
        var englishRequest = new XMLHttpRequest();
        englishRequest.open("GET", "../Data/StaticContentEnglish.json", true);
        englishRequest.onreadystatechange = function(){
            if (englishRequest.readyState === 4 && englishRequest.status === 200){
                englishData = JSON.parse(englishRequest.responseText);
                processEnglishData();
            }
        };
        englishRequest.send();
    }
}

//The following functions are the places where each package of Data can finally be used
function processGermanData(){
    //germanData can be used in this function
    fillGlobalElements(germanData);
    if (currentUrl.includes('LandingPage.html')){
        fillLandingPage(germanData);
    }else if (currentUrl.includes('GalleryPage.html')){
        fillGalleryPage(germanData);
    }else if (currentUrl.includes('PrivacyPolicy.html')){
        fillPrivacyPolicy(germanData);
    }else if(currentUrl.includes('Participation.html')){
        fillParticipation(germanData);
    }else if (currentUrl.includes('Cookies.html')){
        fillCookies(germanData);
    }
}

function processEnglishData(){
    //englishData can be used in this function
    fillGlobalElements(englishData);
    if (currentUrl.includes('LandingPage.html')){
        fillLandingPage(englishData);
    }else if (currentUrl.includes('GalleryPage.html')){
        fillGalleryPage(englishData);
    }else if (currentUrl.includes('PrivacyPolicy.html')){
        fillPrivacyPolicy(englishData);
    }else if(currentUrl.includes('Participation.html')){
        fillParticipation(englishData);
    }else if (currentUrl.includes('Cookies.html')){
        fillCookies(englishData);
    }
}

function fillGlobalElements(data){
    document.getElementById('homeBtn').innerHTML = data.header.home;
    document.getElementById('galleryBtn').innerHTML = data.header.gallery;
    document.getElementById('participationInformationBtn').innerHTML = data.header.participation;
    document.getElementById('participateBtn').innerHTML = data.header.takePart;

    document.getElementById('homeBtnHamburgerMenu').innerHTML = data.header.home;
    document.getElementById('galleryBtnhomeBtnHamburgerMenu').innerHTML = data.header.gallery;
    document.getElementById('participationInformationBtnhomeBtnHamburgerMenu').innerHTML = data.header.participation;
    document.getElementById('participateBtnhomeBtnHamburgerMenu').innerHTML = data.header.takePart;

    document.getElementById('footerContactHead').innerHTML = data.footer.contact.heading;
    document.getElementById('footerContactAdress').innerHTML = data.footer.contact.adress;
    document.getElementById('footerContactPhone').innerHTML = data.footer.contact.phone;
    document.getElementById('footerContactMail').innerHTML = data.footer.contact.mail;

    document.getElementById('footerMenuHead').innerHTML = data.footer.menu.heading;
    document.getElementById('footerMenuImpress').innerHTML = data.footer.menu.impress;
    document.getElementById('footerMenuPrivacy').innerHTML = data.footer.menu.privacy;
    document.getElementById('footerMenuTermsService').innerHTML = data.footer.menu.TermsOfService;
    document.getElementById('footerMenuTermsPart').innerHTML = data.footer.menu.TermsOfParticipation;
    document.getElementById('footerMenuCookies').innerHTML = data.footer.menu.cookies;
    document.getElementById('footerMenuDisclaimer').innerHTML = data.footer.menu.disclaimer;

    document.getElementById('footerSocialsHead').innerHTML = data.footer.socials.heading;
    document.getElementById('footerCopy').innerHTML = data.footer.copyright

    //cookie Banner
    document.getElementById('cookieBannerText').innerHTML = data.cookieBanner.text;
    document.getElementById('cookieBannerDatenschutz').innerHTML = data.cookieBanner.privacy;
    document.getElementById('cookieBannerCookies').innerHTML = data.cookieBanner.cookies;
    document.getElementById('cookieBannerDatenschutz').innerHTML = data.cookieBanner.privacy;
    document.getElementById('acceptCookiesBtn').innerHTML = data.cookieBanner.button;
}

function fillLandingPage(data){
    document.getElementById('landingHeroHeading1').innerHTML = data.landingPage.hero.heading1;
    document.getElementById('landingHeroHeading2').innerHTML = data.landingPage.hero.heading2;
    document.getElementById('landingHeroBtn').innerHTML = data.landingPage.hero.button;

    document.getElementById('landingIntroHeading').innerHTML = data.landingPage.intro.heading;
    document.getElementById('landingIntroParagraph1').innerHTML = data.landingPage.intro.paragraph1;
    document.getElementById('landingIntroParagraph2').innerHTML = data.landingPage.intro.paragraph2;
    document.getElementById('landingIntroParagraph3').innerHTML = data.landingPage.intro.paragraph3;
    document.getElementById('landingIntroGreet').innerHTML = data.landingPage.intro.greetings;

    document.getElementById('landingSumHead1').innerHTML = data.landingPage.summary.heading1;
    document.getElementById('landingSumHead2').innerHTML = data.landingPage.summary.heading2;
    document.getElementById('landingSumStep1Head').innerHTML = data.landingPage.summary.step1.heading;
    document.getElementById('landingSumStep1Text').innerHTML = data.landingPage.summary.step1.text;
    document.getElementById('landingSumStep2Head').innerHTML = data.landingPage.summary.step2.heading;
    document.getElementById('landingSumStep2Text').innerHTML = data.landingPage.summary.step2.text;
    document.getElementById('landingSumStep3Head').innerHTML = data.landingPage.summary.step3.heading;
    document.getElementById('landingSumStep3Text').innerHTML = data.landingPage.summary.step3.text;
    document.getElementById('landingSumStep4Head').innerHTML = data.landingPage.summary.step4.heading;
    document.getElementById('landingSumStep4Text').innerHTML = data.landingPage.summary.step4.text;
    document.getElementById('landingSumStep5Head').innerHTML = data.landingPage.summary.step5.heading;
    document.getElementById('landingSumStep5Text').innerHTML = data.landingPage.summary.step5.text;
    document.getElementById('landingSumStep6Head').innerHTML = data.landingPage.summary.step6.heading;
    document.getElementById('landingSumStep6Text').innerHTML = data.landingPage.summary.step6.text;
    document.getElementById('landingSumStep7Head').innerHTML = data.landingPage.summary.step7.heading;
    document.getElementById('landingSumStep7Text').innerHTML = data.landingPage.summary.step7.text;
    document.getElementById('landingSumRight').innerHTML = data.landingPage.summary.right;
    document.getElementById('landingSumConc').innerHTML = data.landingPage.summary.conclusion;
    document.getElementById('landingSumGreets').innerHTML = data.landingPage.summary.greets;
    document.getElementById('landingSumSumsi').innerHTML = data.landingPage.summary.sumsi;

    document.getElementById('landingInstHead1').innerHTML = data.landingPage.instruction.heading.one;
    document.getElementById('landingInstHead2').innerHTML = data.landingPage.instruction.heading.two;
    document.getElementById('landingInstStep1Head1').innerHTML = data.landingPage.instruction.step1.heading1;
    document.getElementById('landingInstStep1Head2').innerHTML = data.landingPage.instruction.step1.heading2;
    document.getElementById('landingInstStep1Cont').innerHTML = data.landingPage.instruction.step1.content;
    document.getElementById('landingInstStep2Head1').innerHTML = data.landingPage.instruction.step2.heading1;
    document.getElementById('landingInstStep2Head2').innerHTML = data.landingPage.instruction.step2.heading2;
    document.getElementById('landingInstStep2Cont').innerHTML = data.landingPage.instruction.step2.content;
    document.getElementById('landingInstStep3Head1').innerHTML = data.landingPage.instruction.step3.heading1;
    document.getElementById('landingInstStep3Head2').innerHTML = data.landingPage.instruction.step3.heading2;
    document.getElementById('landingInstStep3Cont').innerHTML = data.landingPage.instruction.step3.content;
    document.getElementById('landingInstStep4Head1').innerHTML = data.landingPage.instruction.step4.heading1;
    document.getElementById('landingInstStep4Head2').innerHTML = data.landingPage.instruction.step4.heading2;
    document.getElementById('landingInstStep4Cont').innerHTML = data.landingPage.instruction.step4.content;

    document.getElementById('landingPartBtn').innerHTML = data.landingPage.participation.button;
    document.getElementById('landingPartHead1').innerHTML = data.landingPage.participation.heading1;
    document.getElementById('landingPartHead2').innerHTML = data.landingPage.participation.heading2;
    document.getElementById('landingPartSubHead').innerHTML = data.landingPage.participation.subheading;
    document.getElementById('landingPartFirst').innerHTML = data.landingPage.participation.first;
    document.getElementById('landingPartLast').innerHTML = data.landingPage.participation.last;
    document.getElementById('landingPartMail').innerHTML = data.landingPage.participation.mail;
    document.getElementById('landingPartChild').innerHTML = data.landingPage.participation.child;
    document.getElementById('landingPartAge').innerHTML = data.landingPage.participation.age;
    document.getElementById('landingPartPicHead').innerHTML = data.landingPage.participation.picture.heading;
    document.getElementById('landingPartPicBtn').innerHTML = data.landingPage.participation.picture.button;
    document.getElementById('landingPartCheckPrivLabel').innerHTML = data.landingPage.participation.checkbox.privacy;
    document.getElementById('landingPartCheckPartLabel').innerHTML = data.landingPage.participation.checkbox.participation;
    document.getElementById('landingPartCheckMailLabel').innerHTML = data.landingPage.participation.checkbox.mail;
    document.getElementById('landingPartSend').innerHTML = data.landingPage.participation.send;

    document.getElementById('landingPartDoneHead').innerHTML = data.landingPage.participation.done.heading;
    document.getElementById('landingPartDoneCont').innerHTML = data.landingPage.participation.done.content;
}

function fillGalleryPage(data){
    document.getElementById('galHeroHead1').innerText = data.gallery.hero.heading1;
    document.getElementById('galHeroHead2').innerText = data.gallery.hero.heading2;
    document.getElementById('galleryHeading').innerText = data.gallery.heading;
    document.getElementById('galInfoText').innerText = data.gallery.info.text;
    document.getElementById('galInfoBtn').innerText = data.gallery.info.button;
}

function fillPrivacyPolicy(data){
    document.getElementById('privacyHead').innerHTML = data.privacy.heading;
    document.getElementById('privacySubHead').innerHTML = data.privacy.subheading;
    document.getElementById('privacyIntro').innerHTML = data.privacy.intro;
    document.getElementById('privacyResponsibleHead').innerHTML = data.privacy.responsible.heading;
    document.getElementById('privacyResponsibleCont10').innerHTML = data.privacy.responsible.content10;
    document.getElementById('privacyResponsibleCont11').innerHTML = data.privacy.responsible.content11;
    document.getElementById('privacyResponsibleCont12').innerHTML = data.privacy.responsible.content12;
    document.getElementById('privacyResponsibleCont13').innerHTML = data.privacy.responsible.content13;
    document.getElementById('privacyResponsibleSubHead').innerHTML = data.privacy.responsible.subheading;
    document.getElementById('privacyResponsibleCont20').innerHTML = data.privacy.responsible.content20;
    document.getElementById('privacyResponsibleCont21').innerHTML = data.privacy.responsible.content21;
    document.getElementById('privacyResponsibleCont22').innerHTML = data.privacy.responsible.content22;
    document.getElementById('privacyResponsibleCont23').innerHTML = data.privacy.responsible.content23;
    document.getElementById('privacyHead1').innerHTML = data.privacy.heading1;
    document.getElementById('privacyCont1').innerHTML = data.privacy.content1;
    document.getElementById('privacyHead2').innerHTML = data.privacy.heading2;
    document.getElementById('privacyCont2').innerHTML = data.privacy.content2;
    document.getElementById('privacyHead3').innerHTML = data.privacy.heading3;
    document.getElementById('privacyCont3').innerHTML = data.privacy.content3;
    document.getElementById('privacyHead4').innerHTML = data.privacy.heading4;
    document.getElementById('privacyCont4').innerHTML = data.privacy.content4;
    document.getElementById('privacyHead5').innerHTML = data.privacy.heading5;
    document.getElementById('privacyCont5').innerHTML = data.privacy.content5;
    document.getElementById('privacyContCurrentStatus').innerHTML = data.privacy.currentStatus;
}

function fillParticipation(data){
    document.getElementById('termOfPartHead').innerHTML = data.TermOfPart.heading;
    document.getElementById('termOfPartCont1').innerHTML = data.TermOfPart.content1;
    document.getElementById('termOfPartCont2').innerHTML = data.TermOfPart.content2;
    document.getElementById('termOfPartCont3').innerHTML = data.TermOfPart.content3;
    document.getElementById('termOfPartPara1').innerHTML = data.TermOfPart.paragraph1;
    document.getElementById('termOfPartPara2').innerHTML = data.TermOfPart.paragraph2;
    document.getElementById('termOfPartPara3').innerHTML = data.TermOfPart.paragraph3;
    document.getElementById('termOfPartPara4').innerHTML = data.TermOfPart.paragraph4;
    document.getElementById('termOfPartPara5').innerHTML = data.TermOfPart.paragraph5;
    document.getElementById('termOfPartPara6').innerHTML = data.TermOfPart.paragraph6;
    document.getElementById('termOfPartPara7').innerHTML = data.TermOfPart.paragraph7;
    document.getElementById('termOfPartPara8').innerHTML = data.TermOfPart.paragraph8;
    document.getElementById('termOfPartPara9').innerHTML = data.TermOfPart.paragraph9;
}

function fillCookies(data){
    document.getElementById('cookiesHead').innerHTML = data.cookies.heading;
    document.getElementById('cookiesCont1').innerHTML = data.cookies.content1;
    document.getElementById('cookiesCont2').innerHTML = data.cookies.content2;
    document.getElementById('cookiesResponsibleHead').innerHTML = data.cookies.responsible.heading;
    document.getElementById('cookiesResponsibleCont1').innerHTML = data.cookies.responsible.content1;
    document.getElementById('cookiesResponsibleCont2').innerHTML = data.cookies.responsible.content2;
    document.getElementById('cookiesResponsibleCont3').innerHTML = data.cookies.responsible.content3;
    document.getElementById('cookiesSubHead').innerHTML = data.cookies.subheading;
    document.getElementById('cookiesCont3').innerHTML = data.cookies.content3;
    document.getElementById('cookiesCont4').innerHTML = data.cookies.content4;
    document.getElementById('cookiesHead1').innerHTML = data.cookies.heading1;
    document.getElementById('cookiesText1').innerHTML = data.cookies.text1;
    document.getElementById('cookiesHead2').innerHTML = data.cookies.heading2;
    document.getElementById('cookiesText2').innerHTML = data.cookies.text2;
    document.getElementById('cookiesHead3').innerHTML = data.cookies.heading3;
    document.getElementById('cookiesText3').innerHTML = data.cookies.text3;
    document.getElementById('cookiesText4').innerHTML = data.cookies.text4;
}