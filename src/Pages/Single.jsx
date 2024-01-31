import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../config/supabase'


const Single = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [fromError, setfromError] = useState("");
  const [smoothieData, setSmoothieData] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(()=>{
    const fetchSmoothie = async () =>{
      const {data, error} =  await supabase
      .from('smoothies')
      .select()
      .eq('id', id)
      .single()

      if(error){
        console.log(error)
      }
      if(data){
        setSmoothieData(data)
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)

      }
    }
    fetchSmoothie();
  },[id])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setfromError("Please fill up the form");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select()

    console.log(data);
    console.log(error);
    if (error) {
      console.log(error);
      setfromError("Please fill up the form");
    }
    if (data) {
      console.log(data);
      setfromError("");
      navigate("/");
    }
  };


  return (
    <div>
      {
        smoothieData && (
          <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex justify-center flex-wrap items-center">
            <form
              onSubmit={handleSubmit}
              className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
            >
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Update Data
              </h2>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="full-name"
                  name="title"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Method
                </label>
                <input
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  type="text"
                  id="email"
                  name="method"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
  
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Rating
                </label>
                <input
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  type="number"
                  id="rating"
                  name="rating"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
  
              {/* <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Method</label>
          <input type="email" id="email" name="method" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div> */}
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Create
              </button>
            </form>
          </div>
        </section>
        )
      }
    </div>
  )
}

export default Single
