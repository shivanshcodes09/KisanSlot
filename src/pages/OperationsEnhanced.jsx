import React, { useMemo, useState } from 'react';
import OperationsMultilingual from './OperationsMultilingual';
import { useLanguage } from '../context/LanguageContext';

const TEXT = {
  en:{title:'Operational Intelligence',sub:'Extra tools for smarter, fairer and low-connectivity procurement',forecast:'Queue Forecast',audit:'Transparency Audit Trail',sms:'Low-connectivity SMS',savings:'Estimated Time Saved',next3:'Next 3 hours',low:'Low',med:'Medium',high:'High',send:'Send My Status by SMS',sent:'Demo SMS prepared with token, ETA and centre status.',walkin:'Compared with a typical walk-in queue',audit1:'Token KS-118 generated',audit2:'Farmer arrival confirmed',audit3:'Queue position recalculated',proof:'Every operational change is timestamped and visible.',mins:'min saved',now:'Now',one:'1 hr',two:'2 hr'},
  hi:{title:'ऑपरेशनल इंटेलिजेंस',sub:'स्मार्ट, निष्पक्ष और कम नेटवर्क वाली खरीद के लिए अतिरिक्त उपकरण',forecast:'कतार पूर्वानुमान',audit:'पारदर्शिता ऑडिट ट्रेल',sms:'कम नेटवर्क SMS',savings:'अनुमानित समय बचत',next3:'अगले 3 घंटे',low:'कम',med:'मध्यम',high:'अधिक',send:'SMS से मेरी स्थिति भेजें',sent:'डेमो SMS तैयार: टोकन, अनुमानित समय और केंद्र स्थिति शामिल।',walkin:'सामान्य वॉक-इन कतार की तुलना में',audit1:'टोकन KS-118 बनाया गया',audit2:'किसान आगमन की पुष्टि',audit3:'कतार स्थिति फिर गणना हुई',proof:'हर संचालन बदलाव समय के साथ दर्ज और दिखाई देता है।',mins:'मिनट बचत',now:'अभी',one:'1 घंटा',two:'2 घंटे'},
  mr:{title:'ऑपरेशनल इंटेलिजन्स',sub:'स्मार्ट, पारदर्शक आणि कमी नेटवर्कमधील खरेदीसाठी अतिरिक्त साधने',forecast:'रांग अंदाज',audit:'पारदर्शक ऑडिट ट्रेल',sms:'कमी नेटवर्क SMS',savings:'अंदाजे वेळ बचत',next3:'पुढील 3 तास',low:'कमी',med:'मध्यम',high:'जास्त',send:'SMS ने माझी स्थिती पाठवा',sent:'डेमो SMS तयार: टोकन, अंदाजे वेळ आणि केंद्र स्थिती.',walkin:'सामान्य वॉक-इन रांगेच्या तुलनेत',audit1:'टोकन KS-118 तयार',audit2:'शेतकरी आगमन निश्चित',audit3:'रांग स्थिती पुन्हा मोजली',proof:'प्रत्येक बदल वेळेसह नोंदवला जातो.',mins:'मिनिटे बचत',now:'आता',one:'1 तास',two:'2 तास'},
  gu:{title:'ઓપરેશનલ ઇન્ટેલિજન્સ',sub:'સ્માર્ટ, પારદર્શક અને ઓછી નેટવર્ક ખરીદી માટે વધારાના સાધનો',forecast:'કતાર પૂર્વાનુમાન',audit:'પારદર્શિતા ઑડિટ ટ્રેલ',sms:'ઓછા નેટવર્ક SMS',savings:'અંદાજિત સમય બચત',next3:'આગામી 3 કલાક',low:'ઓછું',med:'મધ્યમ',high:'વધુ',send:'SMS દ્વારા મારી સ્થિતિ મોકલો',sent:'ડેમો SMS તૈયાર: ટોકન, ETA અને કેન્દ્ર સ્થિતિ.',walkin:'સામાન્ય વૉક-ઇન કતારની સરખામણીમાં',audit1:'ટોકન KS-118 બનાવાયો',audit2:'ખેડૂત આગમન પુષ્ટિ',audit3:'કતાર ફરી ગણાઈ',proof:'દરેક બદલાવ સમય સાથે નોંધાય છે.',mins:'મિનિટ બચત',now:'હવે',one:'1 કલાક',two:'2 કલાક'},
  pa:{title:'ਓਪਰੇਸ਼ਨਲ ਇੰਟੈਲੀਜੈਂਸ',sub:'ਸਮਾਰਟ, ਪਾਰਦਰਸ਼ੀ ਅਤੇ ਘੱਟ ਨੈੱਟਵਰਕ ਖਰੀਦ ਲਈ ਵਾਧੂ ਟੂਲ',forecast:'ਕਤਾਰ ਅਨੁਮਾਨ',audit:'ਪਾਰਦਰਸ਼ਤਾ ਆਡਿਟ ਟ੍ਰੇਲ',sms:'ਘੱਟ ਨੈੱਟਵਰਕ SMS',savings:'ਅਨੁਮਾਨਿਤ ਸਮਾਂ ਬਚਤ',next3:'ਅਗਲੇ 3 ਘੰਟੇ',low:'ਘੱਟ',med:'ਦਰਮਿਆਨਾ',high:'ਵੱਧ',send:'SMS ਰਾਹੀਂ ਮੇਰੀ ਸਥਿਤੀ ਭੇਜੋ',sent:'ਡੈਮੋ SMS ਤਿਆਰ: ਟੋਕਨ, ETA ਅਤੇ ਕੇਂਦਰ ਸਥਿਤੀ।',walkin:'ਆਮ ਵਾਕ-ਇਨ ਕਤਾਰ ਨਾਲ ਤੁਲਨਾ',audit1:'ਟੋਕਨ KS-118 ਬਣਿਆ',audit2:'ਕਿਸਾਨ ਆਉਣ ਦੀ ਪੁਸ਼ਟੀ',audit3:'ਕਤਾਰ ਮੁੜ ਗਿਣੀ ਗਈ',proof:'ਹਰ ਬਦਲਾਅ ਸਮੇਂ ਨਾਲ ਦਰਜ ਹੁੰਦਾ ਹੈ।',mins:'ਮਿੰਟ ਬਚਤ',now:'ਹੁਣ',one:'1 ਘੰਟਾ',two:'2 ਘੰਟੇ'},
  bn:{title:'অপারেশনাল ইন্টেলিজেন্স',sub:'স্মার্ট, স্বচ্ছ ও কম নেটওয়ার্কে ক্রয়ের অতিরিক্ত টুল',forecast:'সারি পূর্বাভাস',audit:'স্বচ্ছতা অডিট ট্রেইল',sms:'কম নেটওয়ার্ক SMS',savings:'আনুমানিক সময় সাশ্রয়',next3:'পরবর্তী ৩ ঘণ্টা',low:'কম',med:'মাঝারি',high:'বেশি',send:'SMS-এ আমার অবস্থা পাঠান',sent:'ডেমো SMS প্রস্তুত: টোকেন, ETA ও কেন্দ্রের অবস্থা।',walkin:'সাধারণ ওয়াক-ইন সারির তুলনায়',audit1:'টোকেন KS-118 তৈরি',audit2:'কৃষকের আগমন নিশ্চিত',audit3:'সারি পুনরায় গণনা',proof:'প্রতিটি পরিবর্তন সময়সহ নথিভুক্ত।',mins:'মিনিট সাশ্রয়',now:'এখন',one:'১ ঘণ্টা',two:'২ ঘণ্টা'},
  ta:{title:'செயல்பாட்டு நுண்ணறிவு',sub:'சிறந்த, வெளிப்படையான மற்றும் குறைந்த இணைப்பு கொள்முதலுக்கான கருவிகள்',forecast:'வரிசை முன்னறிவிப்பு',audit:'வெளிப்படைத்தன்மை பதிவேடு',sms:'குறைந்த நெட்வொர்க் SMS',savings:'மதிப்பிடப்பட்ட நேர சேமிப்பு',next3:'அடுத்த 3 மணி',low:'குறைவு',med:'மிதம்',high:'அதிகம்',send:'SMS மூலம் என் நிலையை அனுப்பு',sent:'டெமோ SMS தயார்: டோக்கன், ETA, மைய நிலை.',walkin:'சாதாரண நேரடி வரிசையுடன் ஒப்பிடுகையில்',audit1:'KS-118 டோக்கன் உருவாக்கப்பட்டது',audit2:'விவசாயி வருகை உறுதி',audit3:'வரிசை மீண்டும் கணக்கிடப்பட்டது',proof:'ஒவ்வொரு மாற்றமும் நேரத்துடன் பதிவு செய்யப்படும்.',mins:'நிமிடம் சேமிப்பு',now:'இப்போது',one:'1 மணி',two:'2 மணி'},
  te:{title:'ఆపరేషనల్ ఇంటెలిజెన్స్',sub:'స్మార్ట్, పారదర్శక మరియు తక్కువ నెట్‌వర్క్ కొనుగోలుకు అదనపు సాధనాలు',forecast:'క్యూ అంచనా',audit:'పారదర్శక ఆడిట్ ట్రైల్',sms:'తక్కువ నెట్‌వర్క్ SMS',savings:'అంచనా సమయ ఆదా',next3:'తదుపరి 3 గంటలు',low:'తక్కువ',med:'మధ్యస్థ',high:'ఎక్కువ',send:'SMS ద్వారా నా స్థితి పంపు',sent:'డెమో SMS సిద్ధం: టోకెన్, ETA, కేంద్ర స్థితి.',walkin:'సాధారణ వాక్-ఇన్ క్యూ తో పోలిస్తే',audit1:'KS-118 టోకెన్ సృష్టించబడింది',audit2:'రైతు రాక నిర్ధారించబడింది',audit3:'క్యూ మళ్లీ లెక్కించబడింది',proof:'ప్రతి మార్పు సమయంతో నమోదు అవుతుంది.',mins:'నిమిషాలు ఆదా',now:'ఇప్పుడు',one:'1 గంట',two:'2 గంటలు'},
  kn:{title:'ಕಾರ್ಯಾಚರಣಾ ಬುದ್ಧಿಮತ್ತೆ',sub:'ಸ್ಮಾರ್ಟ್, ಪಾರದರ್ಶಕ ಮತ್ತು ಕಡಿಮೆ ನೆಟ್‌ವರ್ಕ್ ಖರೀದಿಗೆ ಹೆಚ್ಚುವರಿ ಸಾಧನಗಳು',forecast:'ಸರದಿ ಮುನ್ಸೂಚನೆ',audit:'ಪಾರದರ್ಶಕ ಆಡಿಟ್ ಟ್ರೇಲ್',sms:'ಕಡಿಮೆ ನೆಟ್‌ವರ್ಕ್ SMS',savings:'ಅಂದಾಜು ಸಮಯ ಉಳಿತಾಯ',next3:'ಮುಂದಿನ 3 ಗಂಟೆಗಳು',low:'ಕಡಿಮೆ',med:'ಮಧ್ಯಮ',high:'ಹೆಚ್ಚು',send:'SMS ಮೂಲಕ ನನ್ನ ಸ್ಥಿತಿ ಕಳುಹಿಸಿ',sent:'ಡೆಮೋ SMS ಸಿದ್ಧ: ಟೋಕನ್, ETA, ಕೇಂದ್ರ ಸ್ಥಿತಿ.',walkin:'ಸಾಮಾನ್ಯ ವಾಕ್-ಇನ್ ಸರದಿಯೊಂದಿಗೆ ಹೋಲಿಕೆ',audit1:'KS-118 ಟೋಕನ್ ರಚಿಸಲಾಗಿದೆ',audit2:'ರೈತ ಆಗಮನ ದೃಢ',audit3:'ಸರದಿ ಮರು ಲೆಕ್ಕಿಸಲಾಗಿದೆ',proof:'ಪ್ರತಿ ಬದಲಾವಣೆ ಸಮಯದೊಂದಿಗೆ ದಾಖಲಾಗುತ್ತದೆ.',mins:'ನಿಮಿಷ ಉಳಿವು',now:'ಈಗ',one:'1 ಗಂಟೆ',two:'2 ಗಂಟೆ'},
  ml:{title:'ഓപ്പറേഷണൽ ഇന്റലിജൻസ്',sub:'സ്മാർട്ട്, സുതാര്യവും കുറഞ്ഞ നെറ്റ്‌വർക്കുമായ വാങ്ങലിനുള്ള അധിക ഉപകരണങ്ങൾ',forecast:'ക്യൂ പ്രവചനം',audit:'സുതാര്യത ഓഡിറ്റ് ട്രെയിൽ',sms:'കുറഞ്ഞ നെറ്റ്‌വർക്ക് SMS',savings:'അനുമാനിച്ച സമയം ലാഭം',next3:'അടുത്ത 3 മണിക്കൂർ',low:'കുറവ്',med:'മിതം',high:'കൂടിയത്',send:'SMS വഴി എന്റെ നില അയക്കുക',sent:'ഡെമോ SMS തയ്യാറായി: ടോക്കൺ, ETA, കേന്ദ്ര സ്ഥിതി.',walkin:'സാധാരണ വാക്ക്-ഇൻ ക്യൂവുമായി താരതമ്യം',audit1:'KS-118 ടോക്കൺ സൃഷ്ടിച്ചു',audit2:'കർഷകന്റെ വരവ് സ്ഥിരീകരിച്ചു',audit3:'ക്യൂ വീണ്ടും കണക്കാക്കി',proof:'ഓരോ മാറ്റവും സമയത്തോടെ രേഖപ്പെടുത്തുന്നു.',mins:'മിനിറ്റ് ലാഭം',now:'ഇപ്പോൾ',one:'1 മണിക്കൂർ',two:'2 മണിക്കൂർ'}
};

const fallback = TEXT.hi;

export default function OperationsEnhanced(){
  const { language } = useLanguage();
  const t = TEXT[language] || fallback;
  const [smsSent,setSmsSent] = useState(false);
  const forecast = useMemo(()=>[
    {label:t.now,value:42,state:t.med},
    {label:t.one,value:68,state:t.high},
    {label:t.two,value:29,state:t.low}
  ],[t]);
  const logs = [
    {time:'11:08',text:t.audit1},
    {time:'11:14',text:t.audit2},
    {time:'11:15',text:t.audit3}
  ];
  const card={background:'#fff',border:'1px solid #e5ebe6',borderRadius:18,padding:20,boxShadow:'0 10px 28px rgba(27,77,46,.08)'};
  return <>
    <OperationsMultilingual />
    <section style={{background:'#f3f7f3',padding:'8px 5% 60px',fontFamily:'Segoe UI, sans-serif'}}>
      <div style={{maxWidth:1180,margin:'0 auto'}}>
        <div style={{margin:'18px 0 20px'}}><h2 style={{color:'#1B4D2E',fontSize:30,marginBottom:6}}>{t.title}</h2><p style={{color:'#66756d',margin:0}}>{t.sub}</p></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
          <div style={card}>
            <div style={{fontWeight:800,color:'#1B4D2E',fontSize:20}}>{t.forecast}</div><div style={{fontSize:12,color:'#7b8a82',margin:'4px 0 16px'}}>{t.next3}</div>
            {forecast.map(x=><div key={x.label} style={{marginBottom:12}}><div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}><span>{x.label}</span><b>{x.state}</b></div><div style={{height:9,borderRadius:10,background:'#edf1ed',overflow:'hidden'}}><div style={{width:`${x.value}%`,height:'100%',background:'#2D7A3E'}}/></div></div>)}
          </div>
          <div style={card}>
            <div style={{fontWeight:800,color:'#1B4D2E',fontSize:20}}>{t.audit}</div><p style={{fontSize:13,color:'#66756d'}}>{t.proof}</p>
            {logs.map((x,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'52px 1fr',gap:10,padding:'9px 0',borderTop:i?'1px solid #edf0ed':'none',fontSize:13}}><b style={{color:'#1B4D2E'}}>{x.time}</b><span>{x.text}</span></div>)}
          </div>
          <div style={card}>
            <div style={{fontWeight:800,color:'#1B4D2E',fontSize:20}}>{t.sms}</div><p style={{fontSize:13,color:'#66756d'}}>KS-118 • ETA 36 min • Gurugram Centre</p>
            <button onClick={()=>setSmsSent(true)} style={{width:'100%',padding:'11px 12px',border:0,borderRadius:10,background:'#1B4D2E',color:'white',fontWeight:800,cursor:'pointer'}}>{t.send}</button>
            {smsSent&&<div style={{marginTop:12,padding:10,borderRadius:10,background:'#eef7ef',fontSize:12,color:'#1B4D2E'}}>✅ {t.sent}</div>}
          </div>
          <div style={{...card,background:'linear-gradient(135deg,#1B4D2E,#2D7A3E)',color:'white'}}>
            <div style={{fontWeight:800,fontSize:20}}>{t.savings}</div><div style={{fontSize:48,fontWeight:900,margin:'14px 0 2px'}}>104</div><div style={{fontWeight:800}}>{t.mins}</div><p style={{opacity:.82,fontSize:13}}>{t.walkin}</p>
          </div>
        </div>
      </div>
    </section>
  </>;
}
