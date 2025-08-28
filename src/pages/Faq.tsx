import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "Is my money safe in this wallet?",
      a: "Yes, your funds are protected with industry-grade encryption and security protocols.",
    },
    {
      q: "Can I transfer money internationally?",
      a: "Absolutely! You can send money across borders quickly and securely.",
    },
    {
      q: "What fees do you charge?",
      a: "We keep our fees minimal and transparent. You’ll always know before you confirm a transaction.",
    },
    {
      q: "Is there a mobile app?",
      a: "Yes, our mobile app is available for both iOS and Android.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h1>
          <p className="mt-4 text-gray-600">
            Tap a question to see the answer.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg">
              {/* Question */}
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-800 focus:outline-none"
              >
                {faq.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === idx && (
                <div className="px-5 pb-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
