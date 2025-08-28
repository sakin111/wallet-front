import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [

  {
    number: 50,
    label: 'Billion Transaction Allowance',
    prefix: '$',
    suffix: 'B+'
  },
  {
    number: 180,
    label: 'Countries Supported',
    prefix: '',
    suffix: '+'
  },
  {
    number: 99.9,
    label: 'Uptime Guarantee',
    prefix: '',
    suffix: '%'
  }
];

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{Math.floor(count)}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Millions
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Worldwide
            </span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join the global community that trusts PayWave for secure, fast, and reliable digital payments.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {stat.prefix}
                  <Counter end={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-purple-200 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}