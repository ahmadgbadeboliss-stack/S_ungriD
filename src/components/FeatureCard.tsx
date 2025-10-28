import { CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  features?: string[];
  delay: number;
}

export default function FeatureCard({ icon: Icon, title, description, color, features, delay }: FeatureCardProps) {
  return (
    <div 
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:-translate-y-2 hover:shadow-2xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`bg-gradient-to-r ${color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
        <Icon className="h-8 w-8 text-black" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/80 mb-6">{description}</p>
      {features && (
        <ul className="space-y-2 text-white/70">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}