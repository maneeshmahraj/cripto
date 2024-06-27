



import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
const Home = () => {
  const arr=['usd','eur','gby','cny','jpy'];
  const [currency,setCurrency]=useState(0)
   const [selectedCurrency,setSeletedCurrency]=useState("usd");
    const [cunvetedCurr,setCunvertedCurr]=useState(0);
    const [isUp,setIsUp]=useState(true);
     const [diff,setDiff]=useState(0);


   const handleCurrencyType=(e)=>{
     let type=e.target.value;
    // console.log(type);
     setSeletedCurrency(type);
   }
   //https://api.frontendeval.com/fake/crypto/<CODE>
  const handleInputChange=(e)=>{
  let val=e.target.value;
  setCurrency(val);
 
  // console.log(val)
  }
  const fetchCurrencyInfo=async()=>{

    let url=`https://api.frontendeval.com/fake/crypto/${selectedCurrency}`;
    let result =await fetch(url);
    let data =await result.json();
    let val=data.value;
       let showcurr=currency*val;
      setCunvertedCurr(showcurr.toFixed(2));
     // console.log(cunvetedCurr);
     const prevVal=window.sessionStorage.getItem("prevVal");
      window.sessionStorage.setItem("prevVal",showcurr.toFixed(2));
      
     
      let diff=showcurr.toFixed(2)-prevVal;
      
      
      diff<0?setIsUp(false):setIsUp(true);
      setDiff(diff);
      // console.log(diff);
  }
  useEffect(()=>{
    let time;
     time=setInterval(()=>{
      fetchCurrencyInfo();
     },2000)
     return ()=>{
      clearInterval(time);
     }
    
  },[currency,selectedCurrency])
  return (
   <>
    <div className="prent">
        <h2>CriptoConvetor App</h2>
        <div className='wrapper'>
          <input
           value={currency}
           onChange={handleInputChange}
          type='number'/>
          <select
          name="currency"
          value={selectedCurrency}
          onChange={handleCurrencyType}
          
          >
           {
            arr.map((curr)=>{
              return(
                <>
                  <option 
                  key={curr}
                  value={curr}>{curr.toUpperCase()}</option>
                </>
              )
            })
           }
          </select>
        </div>
        <div className='curr-info'>
          <div>{cunvetedCurr}</div>
          <div>WUC</div>
          <div className={isUp?"green":"red"}>
            <span>{isUp ? <IoIosArrowRoundUp/>:<IoIosArrowRoundDown />}</span>
            <span>{diff.toFixed(2)}</span>
          </div>
        </div>
    </div>
   </>
  )
}

export default Home;