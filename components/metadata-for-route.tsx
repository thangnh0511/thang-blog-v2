"use client"

import { useState, useEffect } from "react"
import { FaMap } from "react-icons/fa"
import { TbRoute } from "react-icons/tb"
import Offcanvas from "react-bootstrap/Offcanvas"
import Timeline from "./timeline"

interface TravelRouteModalProps {
  location?: string
  locationUrl?: string
  travelRouteData?: any
  locale: "en" | "vi"
  metadata?: {
    metadata_en?: {
      metadata_raw_en?: {
        code?: string
      }
      meta_title_en?: string
    }
    metadata_vi?: {
      metadata_raw_vi?: {
        code?: string
      }
      meta_title_vi?: string
    }
  }
}

export default function TravelRouteModal({
  location,
  locationUrl,
  travelRouteData,
  locale,
  metadata,
}: TravelRouteModalProps) {
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Check for dark mode preference
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkTheme(document.documentElement.classList.contains("dark"))

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class" && mutation.target === document.documentElement) {
            setIsDarkTheme(document.documentElement.classList.contains("dark"))
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })
      return () => observer.disconnect()
    }
  }, [])

  // Get the correct metadata based on locale
  const metaCode =
    locale === "en" ? metadata?.metadata_en?.metadata_raw_en?.code : metadata?.metadata_vi?.metadata_raw_vi?.code

  const metaTitle = locale === "en" ? metadata?.metadata_en?.meta_title_en : metadata?.metadata_vi?.meta_title_vi

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas)

  // Debug the travelRouteData
  useEffect(() => {
    if (travelRouteData) {
      console.log("Travel Route Data:", travelRouteData)
    }
  }, [travelRouteData])

  // If no location is provided, don't render anything
  if (!location) return null

  return (
    <>
      {/* Location Button */}
      <div className="inline-block w-fit cursor-pointer" onClick={handleToggleOffcanvas}>
        <div
          className={`
          text-sm 
          ${isDarkTheme ? "text-gray-200" : "text-black"} 
          ${isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}
          flex flex-row font-raleway my-2 mb-4 shadow-md rounded-lg inline-block hover:shadow-lg py-2 px-3
        `}
        >
          <FaMap className="text-2xl mr-2" />
          <div className="text-lg font-bold">
            {location}
            <div className="text-red-500 text-sm">{locale === "en" ? "View Travel Route" : "Xem Lộ Trình"}</div>
          </div>
        </div>
      </div>

      {/* Offcanvas for Travel Route */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleToggleOffcanvas}
        placement="end"
        className={`w-[800px] ${isDarkTheme ? "bg-gray-900 text-white" : ""}`}
        style={{
          width: "600px",
        }}
      >
        <div className={`text-xl font-bold ${isDarkTheme ? "bg-gray-800" : "bg-primary-black"} text-primary-white`}>
          <Offcanvas.Header closeButton closeVariant="white" className="text-primary-white">
            <Offcanvas.Title as="h1" className="flex flex-row content-center items-center font-bold font-raleway">
              <TbRoute className="mr-3" />
              {location}
            </Offcanvas.Title>
          </Offcanvas.Header>
        </div>
        <Offcanvas.Body className={isDarkTheme ? "bg-gray-900 text-white" : ""}>
          {/* Location URL as a link if available */}
          {locationUrl && (
            <div className="mb-4">
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center
                  ${isDarkTheme ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-700"}
                  underline
                `}
              >
                <FaMap className="mr-2" />
                {locale === "en" ? "View on Map" : "Xem trên Bản đồ"}
              </a>
            </div>
          )}

          {/* Render metadata code if available */}
          {metaCode && (
            <div
              className={`mb-4 p-4 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}
              dangerouslySetInnerHTML={{ __html: metaCode }}
            />
          )}

          {/* Render Timeline if travel route data is available */}
          {travelRouteData ? (
            <Timeline data={travelRouteData} />
          ) : (
            <div className={`italic ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
              {locale === "en" ? "No travel route information available." : "Không có thông tin lộ trình du lịch."}
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

