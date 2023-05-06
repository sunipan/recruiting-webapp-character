import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils/utils";

export const Skills = ({
  index,
  skills,
  attributes,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex flex-col col-span-2">
      <div className="text-center font-bold text-xl mb-2">Skills</div>
      <div>
        Total Points: {10 + 4 * calculateModifier(attributes, "Intelligence")}
      </div>
      <div className="grid h-full">
        {SKILL_LIST.map((skill) => {
          return (
            <div className="grid grid-cols-5" key={skill.name}>
              <div className="col-span-2">
                {skill.name}: {skills[skill.name]}
              </div>
              <div>
                Mod:&nbsp;
                {calculateModifier(attributes, skill.attributeModifier)}
              </div>
              <div>
                Total:{" "}
                {skills[skill.name] +
                  calculateModifier(attributes, skill.attributeModifier)}
              </div>
              <div>
                <button
                  onClick={() => onDecrement(skill.name, index)}
                  className="mr-2 w-6 h-6 rounded-full bg-white text-black"
                >
                  -
                </button>
                <button
                  className="mr-1 w-6 h-6 rounded-full bg-white text-black"
                  onClick={() => onIncrement(skill.name, index)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
