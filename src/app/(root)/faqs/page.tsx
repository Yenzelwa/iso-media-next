'use client'
import React, { useState } from "react";


const faqs = [
  {
    question: "What is Isolakwamuntu?",
    answer:
      "Isolakwamuntu is a streaming platform offering thought-provoking documentaries and educational series focused on personal, societal, and spiritual growth.",
  },
  {
    question: "How do I subscribe?",
    answer:
      "You can subscribe via the 'Plans' section. Choose a monthly or yearly plan and complete your payment through our secure billing system.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription anytime through your account settings. Your access will continue until the current billing period ends.",
  },
  {
    question: "Is the content suitable for children?",
    answer:
      "Most content is educational and safe, but parental discretion is advised. We are working on labeling all child-friendly content clearly.",
  },
];

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 font-medium text-lg hover:bg-red-50 transition duration-200"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-gray-400 border-t pt-6">
          &copy; {new Date().getFullYear()} Isolakwamuntu Media. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
