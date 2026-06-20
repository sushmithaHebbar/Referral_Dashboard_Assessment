import { DollarSign, Percent, Link, PlusCircle, Shield, ArrowLeftRight, Circle } from 'lucide-react';

const OverviewSection = ({ metrics }) => {
  const renderMetricIcon = (label) => {
    const text = label.toLowerCase();
    let IconComponent = Circle;

    if (text.includes('balance')) {
      IconComponent = DollarSign;
    } else if (text.includes('percentage')) {
      IconComponent = Percent;
    } else if (text.includes('referral')) {
      IconComponent = Link;
    } else if (text.includes('amount') || text.includes('earning')) {
      IconComponent = PlusCircle;
    } else if (text.includes('commission')) {
      IconComponent = Shield;
    } else if (text.includes('transfer')) {
      IconComponent = ArrowLeftRight;
    }

    return (
      <span className="metric-icon-box bg-primary">
        <IconComponent size={16} color="#ffffff" strokeWidth={2.5} />
      </span>
    );
  };

  return (
    <section className="dashboard-section" role="region" aria-label="Overview metrics">
      <h2 className="section-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id || metric.label} className="metric-card">
            <div className="metric-card-top">
              {renderMetricIcon(metric.label)}
            </div>
            <div className="metric-card-bottom">
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
