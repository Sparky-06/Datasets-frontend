import { Card } from '../ui/Card';
import { Sparkles, Clock, Gauge, Home } from 'lucide-react';

export function AutomationRules() {
  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Automation Rules
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Suggested automation patterns based on usage
          </p>
        </div>
        <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
          <Sparkles size={24} />
        </div>
      </div>

      {/* Static Insights */}
      <div className="space-y-4">

        <InsightCard
          icon={<Clock size={18} />}
          title="Night Mode Pattern"
          description="Lights are frequently turned off between 10:00 PM – 11:00 PM."
          tag="Rule-Based"
        />

        <InsightCard
          icon={<Gauge size={18} />}
          title="Climate Control Trend"
          description="AC usage increases when indoor temperature exceeds 26°C."
          tag="ML-Assisted"
        />

        <InsightCard
          icon={<Home size={18} />}
          title="Away Mode Insight"
          description="No occupancy detected for long periods during late evenings."
          tag="Rule-Based"
        />
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 mt-6">
        ℹ️ Automation execution is currently disabled.  
        These rules are shown as system-generated recommendations.
      </p>
    </Card>
  );
}

/* ------------------------------ */
/* Insight Card                   */
/* ------------------------------ */

function InsightCard({
  icon,
  title,
  description,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="text-gray-400">{icon}</div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      </div>
      <p className="text-sm text-gray-600 ml-6">{description}</p>
    </div>
  );
}

