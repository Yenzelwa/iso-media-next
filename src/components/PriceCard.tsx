import { PricingPlan } from '@/typings';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isSelected,
  onSelect,
  isPopular = false
}) => {

const router = useRouter();

// Removed incorrect onSelect usage

  return (
    <article
      className={`
        relative p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-1
        ${isSelected
          ? 'border-2 border-red-500 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 shadow-xl shadow-red-500/20'
          : 'border border-white/10 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 hover:border-white/20 hover:shadow-lg'
        }
        ${isPopular ? 'overflow-hidden' : ''}
      `}
    >
      {isPopular && (
        <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-red-500 to-red-600 text-white px-12 py-1 text-sm font-semibold shadow-lg">
          Popular
        </div>
      )}

      <header className="relative z-10 mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-gray-400">/{plan.type.toLowerCase()}</span>
        </div>

        <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-red-500 to-transparent"></div>
      </header>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3 text-gray-300">
            <svg
              className={`w-5 h-5 mt-1 ${isSelected ? 'text-red-500' : 'text-green-500'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        className={`
          relative w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300
          ${isSelected
            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40'
            : 'bg-gradient-to-r from-white/10 to-white/5 text-white hover:from-white/15 hover:to-white/10'
          }
          before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-300
          hover:before:scale-105 before:opacity-0 hover:before:opacity-100
          before:border before:border-white/20 before:-z-10
        `}
      >
        {isSelected ? 'Current Plan' : 'Select Plan'}
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl -z-10"></div>
    </article>
  );
};
