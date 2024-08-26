const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="32"
            cy="32"
          />
          <circle
            className="text-blue-500"
            strokeWidth="5"
            strokeDasharray="157"
            strokeDashoffset={157 - (157 * percentage) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="32"
            cy="32"
          />
        </svg>
        <span className="absolute text-xl font-semibold">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
