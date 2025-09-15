import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { TourWrapper } from "@/pages/TourWrapper";

 



export default function HeroSection() {

    const steps = [
    { target: '[data-tour="hero"]', content: "this is Hero section " },
   
  ];


  return (
  <TourWrapper steps={steps} tourId="hero-tour" autoStart={true} delay={500}>
      <section className="w-full  max-w-full min-h-screen bg-gradient-to-br flex items-center rounded-b-md" data-tour="hero" >
      <div className="w-full px-6 flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight primary"
          >
            Your Digital{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Wallet
            </span>{" "}
            Reimagined
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
          >
            Send, receive, and manage your money with{" "}
            <span className="font-semibold text-gray-800">bank-level security</span>{" "}
            and <span className="text-teal-600">lightning-fast speeds</span>.
          </motion.p>

          <Link to="/register">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.6 }}
            >
              <Button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-xl hover:shadow-lg hover:scale-[1.05] transition">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center relative h-96">
          {/* Circle 1 */}
          <motion.div
            className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 blur-3xl opacity-70"
            animate={{
              x: [0, 80, -60, 0],
              y: [0, -60, 70, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Circle 2 */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-70"
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 70, -60, 0],
              scale: [1.1, 0.9, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <motion.div
            className="absolute w-40 h-40 rounded-full bg-white/20 blur-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

      </div>
    </section>
  </TourWrapper>
  );
}
