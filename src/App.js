import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import { Attributes } from "./components/Attributes";
import { Classes } from "./components/Classes";
import { Skills } from "./components/Skills";
import { calculateModifier } from "./utils/utils";

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

  /* Handlers */
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
      </section>
    </div>
  );
}

export default App;
