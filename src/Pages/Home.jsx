import React, { useEffect, useState } from 'react'
import supabase from '../config/supabase'
import SmoothieCard from '../Components/SmoothiCard/SmoothieCard';
const Home = () => {
    // console.log(supabase)
    const [fetchEror, setFetchError] = useState(null);
    const [smoothies, setSmoothies] = useState(null);

    const handleDelete = (id)=>{
      setSmoothies(prev=>{
        return prev.filter(del=> del.id !== id)
      })
    }

    useEffect(()=>{
      const fetchsmoothies  = async()=>{
        const {data, error} = await supabase
        .from('smoothies')
        .select()

        if(error){
          setFetchError('could not fetch smoothie');
          setSmoothies(null)
          console.log(error);
        }
        if(data){
          setSmoothies(data)
          setFetchError(null)
          console.log(data)
        }
      }

      fetchsmoothies();
    }, [])
  return (
    <div>
      {fetchEror && (<p>{fetchEror}</p>)}
      {smoothies && (
        <div className="smoothies grid grid-cols-3 gap-6">
          {smoothies.map(smothie=> <SmoothieCard key={smothie.id} smoothie={smothie} handleDelete={handleDelete}/>)}
        </div>
      )}
    </div>
  )
}

export default Home
