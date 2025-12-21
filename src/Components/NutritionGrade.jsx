const gradeColors = {
  a: "bg-green-500",
  b: "bg-lime-500",
  c: "bg-yellow-500",
  d: "bg-orange-500",
  e: "bg-red-500",
};

export const NutritionGrade = ({ grade }) => {
  if (!grade) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Grade:</span>
      <span
        className={`${
          gradeColors[grade.toLowerCase()] || "bg-gray-400"
        } text-white px-2.5 py-1 rounded text-sm font-bold uppercase`}
      >
        {grade}
      </span>
    </div>
  );
};
