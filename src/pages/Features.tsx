import { Shield, Zap, Globe, Smartphone, Banknote, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Shield className="h-8 w-8 text-teal-600" />,
    title: "Bank-Level Security",
    description: "Your money is protected with industry-leading encryption and fraud detection.",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Instant Transfers",
    description: "Send and receive money globally in seconds — anytime, anywhere.",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-purple-600" />,
    title: "Mobile First",
    description: "Manage your wallet on the go with our sleek mobile-friendly design.",
  },
  {
    icon: <Banknote className="h-8 w-8 text-pink-600" />,
    title: "Easy Payments",
    description: "Pay bills, recharge, and shop online with a few taps.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    title: "Smart Insights",
    description: "Track your spending and get insights to save more every month.",
  },
  {
    icon: <Globe className="h-8 w-8 text-emerald-600" />,
    title: "Global Access",
    description: "Your wallet works worldwide with support for multiple currencies.",
  },
];

export default function Features() {
  return (
    <section className="w-full min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800"
        >
          Powerful Features,{" "}
          <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
            Made Simple
          </span>
        </motion.h2>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to send, save, and manage money — without the hassle.
        </p>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
