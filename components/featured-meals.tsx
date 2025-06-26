
'use client'
import { Card, CardContent } from "@/components/ui/card"
import { MoreVertical, Star, X } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import EditMealForm from "./edit-food"


export interface food {
    _id:string,
    foodName: string,
    foodRating: number,
    foodPrice: number,
    foodImage: string,
    restaurantName: string,
    restaurantLogo: string,
    restaurantStatus: string
}

export function FeaturedMeals() {
    const [meals,setMeals] = useState<food[]>([])
    const [viewMore,setViewMore] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [viewEdit,setViewEdit] = useState<boolean>(false)

    useEffect(()=>{
        const fetchFood = async ()=>{
            try {
                const res = await fetch('https://food-app-backend-henna-six.vercel.app/api/food')
                const foods = await res.json()
                if (foods){
                    setMeals(foods)
                } 
            } catch (error) {
                console.log(error)
            }
        }

        fetchFood()
    },[])

    const deleteMeal = async (id:string)=>{

        setLoading(true)

        try {
            
            const res = await fetch(`https://food-app-backend-henna-six.vercel.app/api/food/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(res.ok){
                const intervalID = setTimeout(()=>{
                    window.alert("Meal deleted successfully!")
                    window.location.reload()
                },1000)

                setLoading(false)

                return ()=>clearTimeout(intervalID)
            }

            else window.alert("Meal not deleted. Try again!")

        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {meals.map((meal) => (
            <Card key={meal._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={meal.foodImage || "/placeholder.svg"}
                  alt={meal.foodName}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  ${meal.foodPrice}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                <Image
                  src={meal.restaurantLogo || "/placeholder.svg"}
                  alt={meal.restaurantName}
                  width={10}
                  height={10}
                  className="w-10 h-10 object-cover"
                />
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600">{meal.foodName}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{meal.foodRating}</span>
                      </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 relative items-center">
                    <div className="flex items-center justify-between my-2">
                      <span className={`${meal.restaurantStatus==="open"?"bg-green-100":"bg-red-100"} ${meal.restaurantStatus==="open"?"text-green-700":"text-red-700"} rounded-full px-2 py-0.5 `}>{meal.restaurantStatus}</span>
                    </div>
                    {viewMore===meal._id && <div className="flex gap-3 w-full absolute bg-gray-900 rounded-md p-8">
                                  <button onClick={()=>deleteMeal(meal._id)}  type="submit" className="flex-1 px-2 py-1 text-xs rounded-md bg-orange-500 hover:bg-orange-600 text-white">
                                    {loading? "Deleating...": "Delete"}
                                  </button>
                                  <button
                                    onClick={()=>setViewEdit(true)}
                                    type="button"
                                    className="flex-1 text-xs bg-blue-400 rounded-md px-2 py-1 text-white  border-gray-300 hover:bg-blue-500"
                                  >
                                    Edit
                                  </button>

                                  <X className="text-white absolute top-2 right-2 cursor-pointer" size={18} onClick={()=>setViewMore("")}/>
                                </div>}
                    <div>
                        <MoreVertical onClick={()=>setViewMore(()=>meal._id)} className="cursor-pointer"></MoreVertical>
                    </div>
                </div>
                {viewEdit && <EditMealForm id={meal._id}/>}
              </CardContent>
            </Card>
          ))}

          {meals.length===0 && <p className="text-lg font-bold text-center">No Meal Available today.</p>}
        </div>

        <div className="text-center">
          <Button className="bg-orange-400 text-white hover:bg-orange-500 px-8 py-2">Learn more</Button>
        </div>

       
      </div>
    </section>
  )
}
