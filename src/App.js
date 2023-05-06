import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import { Attributes } from "./components/Attributes";
import { Classes } from "./components/Classes";

function App() {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.reduce((acc, attribute) => ({ ...acc, [attribute]: 10 }), {})
  );

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="grid grid-cols-3 gap-4">
          <Attributes
            attributes={attributes}
            onIncrement={handleAttributeIncrement}
            onDecrement={handleAttributeDecrement}
          />
          <Classes classes={CLASS_LIST} attributes={attributes} />
        </div>
      </section>
    </div>
  );
}

export default App;
