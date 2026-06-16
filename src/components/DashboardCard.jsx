const DashboardCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-6
      "
    >
      <h3 className="text-slate-400">
        {title}
      </h3>

      <p
        className="
        text-3xl
        font-bold
        mt-2
        "
      >
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;