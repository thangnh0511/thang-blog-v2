interface AboutPageProps {
  searchParams: {
    locale?: string
  }
}

export default function AboutPage({ searchParams }: AboutPageProps) {
  const locale = searchParams.locale || "en"
  const isEnglish = locale === "en"

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        {isEnglish ? "About Me" : "Về tôi"}
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        {isEnglish ? (
          <>
            <p>
              Hello! I'm a passionate writer and creator sharing my thoughts and experiences through this blog. I write
              about technology, design, and personal development.
            </p>
            <p>
              This blog is built with Next.js and Sanity CMS, allowing me to create rich, interactive content that's
              easy to manage and update.
            </p>
            <h2>My Background</h2>
            <p>
              I have a background in technology and design, with experience in web development and content creation. I
              love exploring new technologies and sharing what I learn with others.
            </p>
            <h2>Contact Me</h2>
            <p>
              Feel free to reach out to me via email at <a href="mailto:example@example.com">example@example.com</a> or connect with me on social media.
            </p>
          </>
        ) : (
          <>
            <p>
              Xin chào! Tôi là một người viết và sáng tạo đam mê chia sẻ suy nghĩ và trải nghiệm của mình thông qua blog
              này. Tôi viết về công nghệ, thiết kế và phát triển cá nhân.
            </p>
            <p>
              Blog này được xây dựng bằng Next.js và Sanity CMS, cho phép tôi tạo nội dung phong phú, tương tác dễ quản
              lý và cập nhật.
            </p>
            <h2>Nền tảng của tôi</h2>
            <p>
              Tôi có nền tảng về công nghệ và thiết kế, với kinh nghiệm trong phát triển web và sáng tạo nội dung. Tôi
              thích khám phá công nghệ mới và chia sẻ những gì tôi học được với người khác.
            </p>
            <h2>Liên hệ với tôi</h2>
            <p>
              Hãy liên hệ với tôi qua email tại <a href="mailto:example@example.com">example@example.com</a> hoặc kết nối với tôi trên mạng xã hội.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
