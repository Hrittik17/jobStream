export default function StatItem({ statList }) {
    const { title, count, icon, color, bcg } = statList;
  
    return (
      <div
        className="flex items-center gap-4 p-4 rounded-lg shadow-md"
        style={{ backgroundColor: bcg }}
      >
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: color, color: '#fff' }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    );
  }
  