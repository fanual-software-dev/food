"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { foodSchema,FoodFormData } from "@/zod-validation/validate"
import { food } from "./featured-meals"


export default function EditMealForm({id}:{id:string}) {

    const [food,setFoods] = useState<food>()
    useEffect(()=>{
        const fetchFood = async () => {
            try {
                const res = await fetch("https://food-app-backend-henna-six.vercel.app/api/food")
                const data = await res.json()
                if (res.ok){
                    const meal = data.find((f:food)=>f._id===id)
                    setFoods(()=>meal)
                    console.log("here is the food",meal,data,id)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchFood()
    },[])

  const [formData, setFormData] = useState<FoodFormData>({
    foodName: food?.foodName ?? "",
    foodRating: food?.foodRating ?? 0,
    foodPrice: food?.foodPrice ?? 0,
    foodImage: food?.foodImage ?? "",
    restaurantName: food?.restaurantName ?? "",
    restaurantLogo: food?.restaurantLogo ?? "",
    restaurantStatus: food?.restaurantStatus ?? "",
  })
  

  const [loading,setLoading] = useState<boolean>(false)

  const handleInputChange = (field: string, value: string) => {
    if (field==="foodPrice" || field==="foodRating"){
        setFormData((prev) => ({
            ...prev,
            [field]: value? parseFloat(value) : 0,
        }))
    }
    else{
        setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    }

   
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(()=>true)

    console.log(formData,"Form Data")

    // Validate required fields


    try {
        const res = await fetch(`https://food-app-backend-henna-six.vercel.app/api/food/${id}`,{
            method:"PATCH",
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        })

        if (res.ok){
            window.location.reload()
            console.log("Form submitted:", formData)
        }
    } catch (error) {
        console.error(error)
    }

    setLoading(()=>false)
   
  }

  const handleCancel = () => {
    // Reset form or close modal
    setFormData({
      foodName: "",
      foodRating: 0,
      foodPrice:0,
      foodImage: "",
      restaurantName: "",
      restaurantLogo: "",
      restaurantStatus: "",
    })
    
  }

  return (
    <div className="absolute top-5 left-1/2 z-50 flex items-center justify-center min-h-screen bg-gray-50  p-4">
      <Card className="w-full max-w-md border-2 border-dashed border-blue-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-500">Add a meal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foodName" className="text-sm text-gray-600">
                Food name
              </Label>
              <Input
                id="foodName"
                type="text"
                value={formData.foodName}
                onChange={(e) => handleInputChange("foodName", e.target.value)}
                className="w-full"
                placeholder="Enter food name"
              />
             
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodRating" className="text-sm text-gray-600">
                Food rating
              </Label>
              <Input
                id="foodRating"
                type="number"
                inputMode="numeric"
                value={formData.foodRating}
                onChange={(e) => handleInputChange("foodRating", e.target.value)}
                className="w-full"
                placeholder="Enter food rating"
              />

           
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodRating" className="text-sm text-gray-600">
                Food price
              </Label>
              <Input
                id="foodPrice"
                type="number"
                inputMode="numeric"
                value={formData.foodPrice}
                onChange={(e) => handleInputChange("foodPrice", e.target.value)}
                className="w-full"
                placeholder="Enter food price"
              />

            
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodImage" className="text-sm text-gray-600">
                Food image (link)
              </Label>
              <Input
                id="foodImage"
                type="url"
                value={formData.foodImage}
                onChange={(e) => handleInputChange("foodImage", e.target.value)}
                className="w-full"
                placeholder="Enter food image URL"
              />

             
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="text-sm text-gray-600">
                Restaurant name
              </Label>
              <Input
                id="restaurantName"
                type="text"
                value={formData.restaurantName}
                onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                className="w-full"
                placeholder="Enter restaurant name"
              />

          
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantLogo" className="text-sm text-gray-600">
                Restaurant logo (link)
              </Label>
              <Input
                id="restaurantLogo"
                type="url"
                value={formData.restaurantLogo}
                onChange={(e) => handleInputChange("restaurantLogo", e.target.value)}
                className="w-full"
                placeholder="Enter restaurant logo URL"
              />

              
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantStatus" className="text-sm text-gray-600">
                Restaurant status (open/close)
              </Label>
              <Select
                value={formData.restaurantStatus}
                onValueChange={(value) => handleInputChange("restaurantStatus", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select restaurant status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Close</SelectItem>
                </SelectContent>
              </Select>

             
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                {loading? "Editing food...": "Edit Food"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
