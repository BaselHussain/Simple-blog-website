import Footer from '@/components/Footer'
import React from 'react'

export default function page() {
  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            About Our Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            A collaborative platform for sharing ideas, insights, and stories
            from various authors.
          </p>
        </div>
      </div>

      {/* Blog Vision and Purpose */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          Our blog is a vibrant hub for knowledge sharing and creative
          storytelling. It serves as a platform where authors from diverse
          backgrounds come together to share unique perspectives, explore
          trending topics, and inspire a global audience.
        </p>
      </div>

      {/* Features or Topics Covered */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Tech & Tutorials</h3>
              <p className="text-gray-600">
                Explore the latest in technology, coding tutorials, and
                in-depth guides for all skill levels.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Lifestyle & Wellness</h3>
              <p className="text-gray-600">
                Discover tips on improving your lifestyle, maintaining wellness,
                and achieving personal growth.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Creative Writing</h3>
              <p className="text-gray-600">
                Dive into the world of storytelling, poetry, and essays from
                talented writers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      
    </div>
   
    </>
  )
}
