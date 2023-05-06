export const Classes = ({ classes, attributes }) => {
  const meetsRequirements = (classKey) => {
    // Compare key lengths
    const keys1 = Object.keys(attributes);
    const keys2 = Object.keys(classes[classKey]);
    if (keys1.length !== keys2.length) return false;
    // Make sure attributes either match or exceed requirements
    for (const key of keys1) {
      if (attributes[key] < classes[classKey][key]) return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col">
      <div className="text-center font-bold text-xl mb-2">Classes</div>
      <div className="grid grid-rows-3 h-full">
        {Object.keys(classes).map((classKey) => {
          return (
            <button
              key={classKey}
              className={`text-center ${
                meetsRequirements(classKey) && "font-bold text-green-300"
              }`}
            >
              {classKey}
            </button>
          );
        })}
      </div>
    </div>
  );
};
