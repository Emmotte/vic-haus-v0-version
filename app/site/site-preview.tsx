"use client"

import type React from "react"

import Image from "next/image"
import { MapPin, Users, Bed, Bath, Home, Mail, Phone, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Room {
  id: string
  name: string
  description: string
  images: string[]
  display_order: number | null
}

interface SitePreviewProps {
  siteName: string
  siteDescription: string
  rooms: Room[]
}

export default function SitePreview({ siteName, siteDescription, rooms }: SitePreviewProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openCarousel = (room: Room) => {
    setSelectedRoom(room)
    setCurrentImageIndex(0)
  }

  const closeCarousel = () => {
    setSelectedRoom(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedRoom && selectedRoom.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.images.length)
    }
  }

  const prevImage = () => {
    if (selectedRoom && selectedRoom.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length)
    }
  }

  const RoomCard = ({
    room,
    icon,
  }: {
    room: Room
    icon: React.ReactNode
  }) => {
    const hasImages = room.images && room.images.length > 0

    return (
      <Card className="shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-white text-earthy-950">
        <CardContent className="p-0">
          {hasImages && room.images[0] ? (
            <Image
              src={room.images[0] || "/placeholder.svg"}
              alt={room.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-xl mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-earthy-200 rounded-t-xl flex items-center justify-center mb-4">
              <div className="text-center text-earthy-700">
                {icon}
                <p className="text-sm mt-2">{room.name}</p>
              </div>
            </div>
          )}
          <div className="p-6">
            <h4 className="font-semibold text-earthy-950 mb-2 text-lg">{room.name}</h4>
            <p className="text-earthy-700 text-sm mb-4">{room.description}</p>
            {hasImages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openCarousel(room)}
                className="w-full border-earthy-300 text-earthy-900 hover:bg-earthy-100 hover:text-earthy-950"
              >
                See More ({room.images.length} photos)
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Separate rooms into categories (e.g., Exterior, Interior - Floor 1, Interior - Floor 2)
  // This is a simplified categorization. In a real app, you'd have a more robust way to categorize rooms.
  const exteriorRooms = rooms.filter(room => room.name.toLowerCase().includes("yard") || room.name.toLowerCase().includes("parking"))
  const floor1Rooms = rooms.filter(room => room.name.toLowerCase().includes("living") || room.name.toLowerCase().includes("dining") || room.name.toLowerCase().includes("kitchen") || room.name.toLowerCase().includes("bedroom 1") || room.name.toLowerCase().includes("bedroom 2") || room.name.toLowerCase().includes("bathroom 2"))
  const floor2Rooms = rooms.filter(room => room.name.toLowerCase().includes("bedroom 3") || room.name.toLowerCase().includes("bedroom 4") || room.name.toLowerCase().includes("bedroom 5") || room.name.toLowerCase().includes("bathroom 3"))


  return (
    <div className="min-h-screen bg-earthy-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-earthy-50/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-forest-600" />
              <span className="text-lg font-semibold text-earthy-950">{siteName}</span>
            </div>
            <div className="flex space-x-8">
              <a href="#contact" className="text-earthy-700 hover:text-forest-600 transition-colors">
                Contact
              </a>
              <a href="#availability" className="text-earthy-700 hover:text-forest-600 transition-colors">
                Availability
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Carousel Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button onClick={closeCarousel} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
              <X className="h-8 w-8" />
            </button>

            <div className="relative">
              <Image
                src={selectedRoom.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${selectedRoom.name} - Image ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}
            </div>

            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-semibold">{selectedRoom.name}</h3>
              <p className="text-gray-300">{selectedRoom.description}</p>
              {selectedRoom.images.length > 1 && (
                <p className="text-sm text-gray-400 mt-2">
                  {currentImageIndex + 1} of {selectedRoom.images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-20 bg-earthy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/IMG_2559.jpeg"
              alt="Hero Photo - Exterior View"
              width={1400}
              height={500}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-earthy-950 mb-4 leading-tight">{siteName}</h1>
            <div className="flex items-center justify-center mb-6 text-earthy-700">
              <MapPin className="h-6 w-6 text-forest-600 mr-2" />
              <span className="text-xl md:text-2xl font-medium">{siteDescription}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-earthy-600 text-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-forest-500" />
                <span>10 guests</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2 text-forest-500" />
                <span>5 bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-forest-500" />
                <span>3 bathrooms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exterior Section */}
      {exteriorRooms.length > 0 && (
        <section className="py-16 md:py-24 bg-earthy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-earthy-950 text-center mb-16">Exterior</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exteriorRooms.map((room) => (
                <RoomCard key={room.id} room={room} icon={<Home className="h-8 w-8" />} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interior Section */}
      {(floor1Rooms.length > 0 || floor2Rooms.length > 0) && (
        <section className="py-16 md:py-24 bg-earthy-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-earthy-950 text-center mb-16">Interior</h2>
            {floor1Rooms.length > 0 && (
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-earthy-950 mb-10 text-center">Floor 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {floor1Rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      icon={room.name.toLowerCase().includes("bedroom") ? <Bed className="h-8 w-8" /> : room.name.toLowerCase().includes("bathroom") ? <Bath className="h-8 w-8" /> : <Home className="h-8 w-8" />}
                    />
                  ))}
                </div>
              </div>
            )}
            {floor2Rooms.length > 0 && (
              <div className="mt-16">
                <h3 className="text-3xl font-bold text-earthy-950 mb-10 text-center">Floor 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {floor2Rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      icon={room.name.toLowerCase().includes("bedroom") ? <Bed className="h-8 w-8" /> : room.name.toLowerCase().includes("bathroom") ? <Bath className="h-8 w-8" /> : <Home className="h-8 w-8" />}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="bg-earthy-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-earthy-950 text-center mb-16">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg rounded-xl bg-white text-earthy-950">
              <CardContent className="p-8 text-center">
                <Mail className="h-16 w-16 text-forest-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-earthy-950 mb-3">Email</h3>
                <p className="text-earthy-700 text-lg">drewatupper@gmail.com</p>
                <p className="text-sm text-earthy-600 mt-3">We typically respond within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg rounded-xl bg-white text-earthy-950">
              <CardContent className="p-8 text-center">
                <Phone className="h-16 w-16 text-forest-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-earthy-950 mb-3">Phone</h3>
                <p className="text-earthy-700 text-lg">(778) 676-8166</p>
                <p className="text-sm text-earthy-600 mt-3">Call or text anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Host Section */}
      <section className="py-16 md:py-24 bg-earthy-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-earthy-950 text-center mb-16">About Your Host</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 text-center">
              <Image
                src="/images/df7d5b28-53ca-44a1-bc64-3e532d198b42(1).jpg"
                alt="Host Photo"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-semibold text-earthy-950 mb-4">Drew Tupper</h3>
              <p className="text-earthy-700 mb-6 leading-relaxed">
                I am an executive coach, husband, dad, enjoyer of pickleball, gardening, rock climbing and travelling. I love personal growth, good food, and beautiful places. I live on Vancouver Island. The best place in Canada. We have an old home in Victoria which I have lovingly restored. Check out the photos. I have lived and worked in Japan, Italy and the Caribbean (Grenada). I look forward to meeting you. Drew
              </p>
              <Button
                variant="outline"
                asChild
                className="px-8 py-3 text-lg bg-transparent border-earthy-300 text-earthy-900 hover:bg-earthy-100 hover:text-earthy-950"
              >
                <a href="https://drewtupper.com" target="_blank" rel="noopener noreferrer">
                  Drew's Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className="py-16 md:py-24 bg-earthy-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-earthy-950 text-center mb-16">Check Availability</h2>
          <p className="text-center text-earthy-700 mb-12 text-xl">
            View our live availability calendar below. Contact us directly to book your stay.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&showPrint=0&src=MjBiY2FmYmQ0NDU5YmFkZDMwOWZiZWQxNWVlZGEyZGRjNDYwZGM1OWMwZGM4ZmQzMjNiZTBlMTdjYjBkYzRhYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f6bf26"
                style={{ border: "solid 1px #777" }}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Details */}
      <section className="bg-earthy-200 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-base text-earthy-700 space-y-2">
            <p>
              <strong>STR Licence #:</strong> 00040814
            </p>
            <p>
              <strong>Municipal Registration:</strong> 40814
            </p>
            <p>
              <strong>Provincial Registration:</strong> H413738379
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earthy-900 text-earthy-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Home className="h-8 w-8 text-forest-400" />
            <span className="text-2xl font-bold">Cook St Village Craftsman Home</span>
          </div>
          <p className="text-earthy-300 mb-6 text-lg">Your perfect family getaway in Victoria's best neighbourhood</p>
          <div className="text-earthy-300 space-y-2 text-base">
            <p>Cook St Village, Victoria, BC</p>
            <p>Email: drewatupper@gmail.com | Phone: (778) 676-8166</p>
          </div>
          <div className="border-t border-earthy-700 mt-10 pt-10 text-earthy-400 text-sm">
            <p>&copy; 2025 Cook St Village Craftsman Home. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
