import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            About{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Our Wallet
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We believe money should move as fast as you do. That’s why we built{" "}
            <span className="font-medium">Our Wallet</span> — a simple, secure, 
            and global way to send, save, and manage your money.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To make financial services accessible, transparent, 
              and effortless for everyone. Whether you’re sending money 
              across the world or paying a friend next door — we’re here to help.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To redefine the future of digital money by creating a 
              trusted global ecosystem — where your wallet is all you need 
              to live, work, and grow financially.
            </p>
          </motion.div>
        </div>

        {/* Values / Team Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Security, speed, and simplicity drive everything we build.  
            We’re a team of innovators, designers, and engineers committed 
            to making money management effortless for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
