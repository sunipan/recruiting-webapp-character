import { ATTRIBUTE_LIST } from "../consts";
import { calculateModifier } from "../utils/utils";

export const Attributes = ({ attributes, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col">
      <div className="text-center font-bold text-xl mb-2">Attributes</div>
      <div className="grid gap-2 h-full">
        {ATTRIBUTE_LIST.map((attribute) => (
          <div key={attribute} className="grid grid-cols-3">
            <div className="text-center col-span-2">
              {attribute}: {attributes[attribute]} <br></br>(Modifier:{" "}
              {calculateModifier(attributes, attribute)})
            </div>
            <div className="flex justify-center items-center">
              <button
                className="text-center w-6 h-6 rounded-full mr-2 bg-white text-black"
                onClick={() => onDecrement(attribute)}
              >
                -
              </button>
              <button
                className="text-center w-6 h-6 bg-white text-black rounded-full"
                onClick={() => onIncrement(attribute)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
