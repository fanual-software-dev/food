'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import AddMealForm from "../add-food-form"


export function Header() {

    const [openForm,setOpenForm] = useState<boolean>(false)


  return (
    <header className="px-4 py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
         <Image src="/Logo.svg" width={120} height={120} alt="Logo"></Image>
        </div>
        <Button onClick={()=>setOpenForm(()=>!openForm)} variant="outline" className="text-white rounded-lg cursor-pointer  bg-orange-400 border-white hover:bg-orange-500">
          Add Meal
        </Button>
       { openForm && <AddMealForm/>}
      </div>

      <form>

      </form>
    </header>
  )
}
