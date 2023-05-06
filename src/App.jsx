import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import { Attributes } from "./components/Attributes";
import { Classes } from "./components/Classes";
import { Skills } from "./components/Skills";
import { calculateModifier } from "./utils/utils";
import axios from "axios";
import { useEffect } from "react";

function App() {
  /* State */
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.reduce((acc, attribute) => ({ ...acc, [attribute]: 10 }), {})
  );
  const [skills, setSkills] = useState(
    SKILL_LIST.reduce(
      (acc, { name, attributeModifier }) => ({
        ...acc,
        [name]: calculateModifier(attributes, attributeModifier),
      }),
      {}
    )
  );

  /* Effects */
  useEffect(() => {
    // Fetch saved character and load into memory
    (async () => {
      const res = await axios
        .get(
          "https://recruiting.verylongdomaintotestwith.ca/api/sunipan/character"
        )
        .then((res) => res.data);
      if (res.message) return;
      setAttributes(res.body.attributes);
      setSkills(res.body.skills);
    })();
  }, []);

  /* Handlers */
  const handleSaveCharacter = async () => {
    // Don't care about result
    await axios
      .post(
        "https://recruiting.verylongdomaintotestwith.ca/api/sunipan/character",
        {
          attributes,
          skills,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => console.log(err));
  };

  const handleAttributeIncrement = (attribute) => {
    setAttributes({ ...attributes, [attribute]: attributes[attribute] + 1 });
  };

  const handleAttributeDecrement = (attribute) => {
    setAttributes({
      ...attributes,
      [attribute]:
        attributes[attribute] - 1 < 0 ? 0 : attributes[attribute] - 1,
    });
  };

  const handleSkillIncrement = (skill) => {
    const totalPoints = Object.values(skills).reduce((a, b) => a + b, 0);
    setSkills((prev) => {
      if (totalPoints >= 10 + 4 * calculateModifier(attributes, "Intelligence"))
        return prev;
      return { ...prev, [skill]: prev[skill] + 1 };
    });
  };

  const handleSkillDecrement = (skill) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: prev[skill] - 1 < 0 ? 0 : prev[skill] - 1,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="grid grid-cols-4 gap-4">
          <Attributes
            attributes={attributes}
            onIncrement={handleAttributeIncrement}
            onDecrement={handleAttributeDecrement}
          />
          <Classes classes={CLASS_LIST} attributes={attributes} />
          <Skills
            skills={skills}
            attributes={attributes}
            onIncrement={handleSkillIncrement}
            onDecrement={handleSkillDecrement}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleSaveCharacter}
            className="p-3 bg-white text-black rounded-lg mt-5"
          >
            Save Character
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
