export default function ContactPage() {
  return (
    <section className="w-full min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-gray-600">
            Have questions or need help? Get in touch with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reach Us
            </h2>
            <p className="text-gray-600 mb-3">
              📍 Dhaka, Bangladesh
            </p>
            <p className="text-gray-600 mb-3">
              📧 support@walletapp.com
            </p>
            <p className="text-gray-600 mb-3">
              📞 +880 1234 567 890
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
