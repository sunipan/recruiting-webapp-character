import { useState } from "react";

export const Classes = ({ classes, attributes }) => {
  const [showRequirements, setShowRequirements] = useState(null);

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
              onClick={() => setShowRequirements(classKey)}
              className={`text-center ${
                meetsRequirements(classKey) && "font-bold text-green-300"
              }`}
            >
              {classKey}
            </button>
          );
        })}
        {showRequirements && (
          <>
            <div className="text-center mt-5 border border-white rounded-lg">
              {Object.entries(classes[showRequirements]).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>
            <button
              className="bg-white rounded-lg text-black mt-5"
              onClick={() => setShowRequirements(null)}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
