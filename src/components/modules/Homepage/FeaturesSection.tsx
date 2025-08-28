import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  Smartphone, 
  CreditCard, 
  BarChart3,
  Lock,
  Users
} from 'lucide-react';


const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Instant Transfers',
    description: 'Send money instantly to anyone, anywhere in the world with zero delays.',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Bank-Grade Security',
    description: 'Your funds are protected with military-grade encryption and multi-factor authentication.',
    gradient: 'from-green-400 to-blue-500'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Global Reach',
    description: 'Connect with users in 180+ countries with support for 50+ currencies.',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: 'Mobile First',
    description: 'Optimized for mobile with a beautiful, intuitive interface that works everywhere.',
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Multiple Payment Methods',
    description: 'Link your bank accounts, cards, and crypto wallets in one secure platform.',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Smart Analytics',
    description: 'Track your spending with AI-powered insights and budgeting tools.',
    gradient: 'from-indigo-400 to-purple-500'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white mt-7 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Modern Finance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage your digital finances with confidence and ease.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mt-16"
        >
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 mr-4" />
                <h3 className="text-2xl font-bold">Enterprise Security</h3>
              </div>
              <p className="text-purple-100 mb-6">
                Built with enterprise-grade security features including biometric authentication, 
                fraud detection, and real-time monitoring.
              </p>
              <ul className="space-y-2 text-purple-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  256-bit SSL encryption
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Biometric authentication
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  24/7 fraud monitoring
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 mr-4" />
                <h3 className="text-2xl font-bold">Team Management</h3>
              </div>
              <p className="text-pink-100 mb-6">
                Perfect for businesses with team accounts, role-based permissions, 
                and comprehensive expense management tools.
              </p>
              <ul className="space-y-2 text-pink-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Multi-user accounts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Role-based permissions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Expense tracking
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}