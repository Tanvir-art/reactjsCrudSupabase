import React from "react";
import { Link } from "react-router-dom";
import supabase from "../../config/supabase";

const SmoothieCard = ({ smoothie, handleDelete }) => {
    const handleDeletes = async()=>{
        const {data, error} = await supabase
        .from("smoothies")
        .delete()
        .eq('id', smoothie.id)
        .select()

        if(error){
            console.log(error)
        }

        if(data){
            console.log(data)
            handleDelete(smoothie.id)
        }
    }
  return (
    <div className="bg-gray-300 text-xl shadow-xl py-10">
      <h3>{smoothie.title}</h3>
      <h3>{smoothie.method}</h3>
      <h3>rating: {smoothie.rating}</h3>
      <div className="flex gap-6 justify-center py-4">
        <Link to={`/single/${smoothie.id}`}>
          <button className="bg-green-400 px-6 py-2">Update</button>
        </Link>
      
          <button className="bg-green-400 px-6 py-2" onClick={handleDeletes}>Delete</button>
        
      </div>
    </div>
  );
};

export default SmoothieCard;
