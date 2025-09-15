import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Bell, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const securityFeatures = [
  {
    icon: <Lock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    title: 'Multi-Factor Auth',
    description: 'Multiple layers of authentication keep your account secure.'
  },
  {
    icon: <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    title: 'Fraud Detection',
    description: 'AI-powered system monitors for suspicious activities 24/7.'
  },
  {
    icon: <Bell className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    title: 'Real-time Alerts',
    description: 'Instant notifications for all account activities and transactions.'
  },
  {
    icon: <Globe className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    title: 'Global Compliance',
    description: 'Fully compliant with international financial regulations.'
  }
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Your Security is Our
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Top Priority
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              We use bank-grade security measures to protect your funds and personal information. 
              Your money is safe with PayWave.
            </p>
            
            {/* Security Benefits */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">FDIC Insured</h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Your deposits are insured up to $250,000 by the FDIC.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Zero Liability</h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    You're protected from unauthorized transactions with our zero liability policy.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">24/7 Monitoring</h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Our security team monitors your account around the clock.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h4 className="font-bold primary mb-2 text-sm sm:text-base md:text-lg">
                        {feature.title}
                      </h4>
                      <p className="primary text-xs sm:text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 sm:hidden"
            >
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-semibold text-gray-900">Bank-Grade Security</span>
                </div>
                <p className="text-sm text-gray-600">
                  Protected by industry-leading encryption and security protocols
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Security Certifications - Hidden on mobile, visible on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="hidden sm:block mt-12 md:mt-16 lg:mt-20"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Trusted by Financial Institutions Worldwide
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm md:text-base font-medium">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <span className="text-sm md:text-base font-medium">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="text-sm md:text-base font-medium">SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}