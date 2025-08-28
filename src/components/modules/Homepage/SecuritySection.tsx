import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Bell, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const securityFeatures = [
 
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'Multi-Factor Auth',
    description: 'Multiple layers of authentication keep your account secure.'
  },

  {
    icon: <Eye className="h-8 w-8" />,
    title: 'Fraud Detection',
    description: 'AI-powered system monitors for suspicious activities 24/7.'
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: 'Real-time Alerts',
    description: 'Instant notifications for all account activities and transactions.'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Global Compliance',
    description: 'Fully compliant with international financial regulations.'
  }
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Security is Our
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Top Priority
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We use bank-grade security measures to protect your funds and personal information. 
              Your money is safe with PayWave.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">FDIC Insured</h4>
                  <p className="text-gray-600">Your deposits are insured up to $250,000 by the FDIC.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Zero Liability</h4>
                  <p className="text-gray-600">You're protected from unauthorized transactions with our zero liability policy.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Monitoring</h4>
                  <p className="text-gray-600">Our security team monitors your account around the clock.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Security Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 border border-gray-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

     
      </div>
    </section>
  );
}