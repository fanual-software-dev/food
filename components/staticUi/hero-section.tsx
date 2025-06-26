import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Search } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="bg-orange-400 px-4 py-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Are you starving?</h1>
            <p className="text-lg mb-8 opacity-90">Within a few clicks, find meals that are accessible near you</p>

            <div className="bg-white rounded-lg p-4 max-w-md">
              <div className="flex mb-4">
                <Button variant="ghost" className="text-orange-400 bg-orange-50 rounded-full px-6">
                  <Image src="/motor.svg" width={20} height={20} alt="Motor"></Image>
                </Button>
                <Button variant="ghost" className="text-gray-600 ml-2 rounded-full px-6">
                  <Image src="/key.svg" width={18} height={18} alt="Motor"></Image>
                </Button>
              </div>

              <div className="flex items-center">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-orange-400 absolute left-3 top-3"/>
                  <Input placeholder="What do you want to eat today?" className="pl-10 border-0 bg-gray-50 text-gray-950" />
                </div>
                <Button className="bg-orange-600 hover:bg-orange-500 ml-2 px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Find Meal
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              <Image
                src="/foodImage.jpg"
                alt="Delicious ramen bowl with vegetables and egg"
                width={320}
                height={320}
                className="w-80 h-80 rotate-90 rounded-full object-cover absolute -bottom-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
