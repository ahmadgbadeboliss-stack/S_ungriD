interface StatCardProps {
  value: string | number;
  label: string;
  description?: string;
  color?: string;
  delay?: number;
}

export default function StatCard({ value, label, description, color = "yellow", delay = 0 }: StatCardProps) {
  return (
    <div 
      className="text-center transform transition-all hover:-translate-y-2 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`text-5xl md:text-6xl font-bold text-${color}-400 mb-4`}>{value}</div>
      <div className="text-xl text-white mb-2">{label}</div>
      {description && <div className="text-white/80">{description}</div>}
    </div>
  );
}