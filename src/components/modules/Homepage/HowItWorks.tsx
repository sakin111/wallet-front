import { motion } from 'framer-motion';
import { UserPlus, CreditCard, Send, Check } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: 'Sign Up',
    description: 'Create your account in under 2 minutes with just your email and phone number.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Add Funds',
    description: 'Link your bank account, credit card, or transfer crypto to get started.',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: <Send className="h-8 w-8" />,
    title: 'Send Money',
    description: 'Send money instantly to anyone with just their email or phone number.',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: <Check className="h-8 w-8" />,
    title: 'Done!',
    description: 'Your recipient gets the money instantly with full transaction tracking.',
    color: 'from-orange-500 to-red-400'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with Wallet is simple. Follow these 4 easy steps to begin sending money instantly.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
         
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-purple-100 mb-6">Join millions of users who trust PayWave for their digital payments.</p>
            <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Create Your Account
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}