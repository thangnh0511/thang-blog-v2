"use client"
import React, { useEffect, useState } from "react"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { SiZalo } from "react-icons/si"
import { ImGoogle } from "react-icons/im"
import Head from "next/head"

interface AboutPageProps {
  searchParams: {
    locale?: string
  }
}

export default function AboutPage({ searchParams }: AboutPageProps) {
  const locale = searchParams.locale || "en"
  const isEnglish = locale === "en"

  //const [theme, setTheme] = useState<"light" | "dark">("light")
/*
  useEffect(() => {
    const html = document.querySelector("html")
    if (theme === "dark") {
      html?.classList.add("dark")
    } else {
      html?.classList.remove("dark")
    }
  }, [theme])
*/
/*
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }
*/
  return (
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-4 min-h-80 bg-white dark:bg-transparent transition-all duration-300">
      <Head>
        <title>Thangg - About Me</title>
        <meta name="description" content="About Thang Nguyen" />
        <meta name="keywords" content="about me, thangg, personal, journey, skills, experience" />
        <meta property="og:title" content="About Me - Thang Nguyen" />
        <meta property="og:description" content="Learn more about me and my professional journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thang.vercel.app/about" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/veetee-cms.appspot.com/o/images%2FDSC04603.jpg?alt=media" />
      </Head>

      <div className="col-span-12 flex justify-center items-center p-4">
        <div className="w-full lg:w-3/5">
          {/* Toggle Theme Button */}
          {/* <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className="text-sm px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div> */}

          {/* Card */}
          <div className="border-2 rounded-xl overflow-hidden shadow-xl border-black dark:border-white bg-white dark:bg-transparent transition-all duration-300">
            <div className="flex flex-col lg:flex-row font-primary">
              {/* Avatar + Social Icons */}
              <div
                className="relative w-full lg:w-1/3 h-96 lg:min-h-96 lg:border-r-2 border-black dark:border-white"
                style={{
                  backgroundImage: `url(https://images.ctfassets.net/th9kooigzgsa/3vKUkFqWOLxZ7i1ux9kFrJ/412f8f1fe5302e1c97a4b0b9741b1945/DSC04603.jpg)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                {/* Desktop social icons */}
                <div className="hidden lg:flex flex-row gap-4 items-center justify-between px-8 py-2 absolute bottom-0 right-0 left-0 backdrop-blur-sm border-t border-black dark:border-white">
                  <a href="https://www.linkedin.com/in/thang-nh/" target="_blank" className="text-black dark:text-white hover:text-[#0e76a8]">
                    <FaLinkedinIn size={23} className="hover:scale-150 transition-all" />
                  </a>
                  <a href="https://zalo.me/84906401845" target="_blank" className="text-black dark:text-white hover:text-[#03CA77]">
                    <SiZalo size={36} className="hover:scale-150 transition-all" />
                  </a>
                  <a href="mailto:thangnh0511@gmail.com" className="text-black dark:text-white hover:text-[#ff3e30]">
                    <ImGoogle size={21} className="hover:scale-150 transition-all" />
                  </a>
                  <a href="https://www.facebook.com/Kubo.Kid.0511" target="_blank" className="text-black dark:text-white hover:text-[#3b5998]">
                    <FaFacebookF size={21} className="hover:scale-150 transition-all" />
                  </a>
                </div>

                {/* Mobile Name Display */}
                <div className="block absolute text-black dark:text-white bottom-0 right-0 left-0 lg:hidden text-4xl font-semibold px-4 py-2 backdrop-blur-sm border-t border-black dark:border-white">
                  Thang Nguyen
                </div>
              </div>

              {/* About Description */}
              <div className="w-full lg:w-3/4 flex flex-col bg-gray-50 dark:bg-transparent p-4 transition-all">
                {/* <h1 className="text-4xl font-bold tracking-tight mb-4 text-black dark:text-white">
                  {isEnglish ? "About Me" : "Về tôi"}
                </h1> */}

                <p className="text-base leading-7 text-gray-800 dark:text-gray-300">
                  {isEnglish ? (
                    <>
                      Having graduated with a Management Information System (MIS) degree from Da Nang University of Economics,
                      I embarked on a career in IT. My journey includes two years as an IT Business Analyst specializing in ERP systems,
                      followed by nearly three years at FPT Software, where I contributed to a diverse range of projects.
                      I'm currently challenging myself in the role of a Technical Integration Specialist.
                      With a strong foundation in IT and a keen interest in learning, I'm always eager to explore new technologies.
                      In my free time, I find fulfillment in artistic and athletic pursuits.
                    </>
                  ) : (
                    <>
                      Tôi tốt nghiệp chuyên ngành Hệ thống Thông tin Quản lý (MIS) tại Đại học Kinh tế Đà Nẵng và theo đuổi sự nghiệp trong lĩnh vực IT.
                      Hành trình của tôi bao gồm hai năm làm Business Analyst về hệ thống ERP, sau đó là gần ba năm tại FPT Software,
                      nơi tôi tham gia vào nhiều dự án đa dạng. Hiện tại, tôi đang thử thách bản thân với vai trò Technical Integration Specialist.
                      Với nền tảng vững chắc trong lĩnh vực công nghệ và niềm đam mê học hỏi, tôi luôn mong muốn khám phá công nghệ mới.
                      Khi rảnh rỗi, tôi dành thời gian cho nghệ thuật và thể thao.
                    </>
                  )}
                </p>

                {/* Mobile Social Icons */}
                <div className="lg:hidden flex items-center flex-row gap-4 pt-4">
                  <a href="https://www.linkedin.com/in/thang-nh/" target="_blank" className="text-black dark:text-white hover:text-[#0e76a8]">
                    <FaLinkedinIn size={23} />
                  </a>
                  <a href="https://zalo.me/84906401845" target="_blank" className="text-black dark:text-white hover:text-[#03CA77]">
                    <SiZalo size={36} />
                  </a>
                  <a href="mailto:thangnh0511@gmail.com" className="text-black dark:text-white hover:text-[#ff3e30]">
                    <ImGoogle size={21} />
                  </a>
                  <a href="https://www.facebook.com/Kubo.Kid.0511" target="_blank" className="text-black dark:text-white hover:text-[#3b5998]">
                    <FaFacebookF size={21} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
