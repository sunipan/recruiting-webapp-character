import { Attributes } from "./Attributes";
import { Classes } from "./Classes";
import { Skills } from "./Skills";
import { CLASS_LIST } from "../consts";

export const Character = ({
  index,
  attributes,
  skills,
  handleAttributeIncrement,
  handleAttributeDecrement,
  handleSaveCharacter,
  handleAddCharacter,
  handleSkillIncrement,
  handleSkillDecrement,
}) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Attributes
          attributes={attributes}
          onIncrement={handleAttributeIncrement}
          onDecrement={handleAttributeDecrement}
          index={index}
        />
        <Classes classes={CLASS_LIST} attributes={attributes} />
        <Skills
          index={index}
          skills={skills}
          attributes={attributes}
          onIncrement={handleSkillIncrement}
          onDecrement={handleSkillDecrement}
        />
      </div>
      <div className="w-full gap-x-3 flex justify-center items-center my-5">
        <button
          onClick={handleSaveCharacter}
          className="p-3 bg-white text-black rounded-lg"
        >
          Save Character(s)
        </button>
        <button
          onClick={handleAddCharacter}
          className="p-3 bg-white text-black rounded-lg"
        >
          Add Character
        </button>
      </div>
    </>
  );
};
