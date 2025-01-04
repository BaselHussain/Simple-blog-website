import React from 'react'

export default function Footer() {
  return (
    <div className="bg-indigo-500 text-white py-12">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="mb-6">
            Have a story to share? We're always looking for new voices to
            contribute to our growing community.
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Become an Author
          </a>
        </div>
      </div>
  )
}
