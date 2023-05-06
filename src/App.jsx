import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts.js";
import { calculateModifier } from "./utils/utils";
import axios from "axios";
import { useEffect } from "react";
import { Character } from "./components/Character";

function App() {
  /* State */
  const [characters, setCharacters] = useState([
    {
      attributes: ATTRIBUTE_LIST.reduce(
        (acc, attribute) => ({ ...acc, [attribute]: 10 }),
        {}
      ),
      skills: SKILL_LIST.reduce(
        (acc, { name, attributeModifier }) => ({
          ...acc,
          [name]: 0,
        }),
        {}
      ),
    },
  ]);

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
      setCharacters(res.body.characters);
    })();
  }, []);

  /* Handlers */
  const handleAddCharacter = () => {
    setCharacters([
      ...characters,
      {
        attributes: ATTRIBUTE_LIST.reduce(
          (acc, attribute) => ({ ...acc, [attribute]: 10 }),
          {}
        ),
        skills: SKILL_LIST.reduce(
          (acc, { name, attributeModifier }) => ({
            ...acc,
            [name]: 0,
          }),
          {}
        ),
      },
    ]);
  };

  const handleSaveCharacters = async () => {
    // Don't care about result
    await axios
      .post(
        "https://recruiting.verylongdomaintotestwith.ca/api/sunipan/character",
        {
          characters,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => console.log(err));
  };

  const handleAttributeIncrement = (attribute, index) => {
    // Could probably use useMemo on this calculation, but right now not necessary
    const totalAttributePoints = Object.values(
      characters[index].attributes
    ).reduce((acc, val) => acc + val, 0);
    if (totalAttributePoints >= 70) return;
    const newCharacters = [...characters];
    newCharacters[index].attributes[attribute] += 1;
    setCharacters(newCharacters);
  };

  const handleAttributeDecrement = (attribute, index) => {
    const newCharacters = [...characters];
    const attributeValue = newCharacters[index].attributes[attribute];
    newCharacters[index].attributes[attribute] =
      attributeValue - 1 < 0 ? 0 : attributeValue - 1;
    setCharacters(newCharacters);
  };

  const handleSkillIncrement = (skill, index) => {
    const totalPoints = Object.values(characters[index].skills).reduce(
      (acc, val) => acc + val,
      0
    );
    const newCharacters = [...characters];
    if (
      totalPoints >=
      10 + 4 * calculateModifier(characters[index].attributes, "Intelligence")
    )
      return;
    newCharacters[index].skills[skill] += 1;
    setCharacters(newCharacters);
  };

  const handleSkillDecrement = (skill, index) => {
    const newCharacters = [...characters];
    const skillValue = newCharacters[index].skills[skill];
    newCharacters[index].skills[skill] =
      skillValue - 1 < 0 ? 0 : skillValue - 1;
    setCharacters(newCharacters);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {characters.map((character, index) => (
          <Character
            key={index}
            index={index}
            attributes={characters[index].attributes}
            skills={characters[index].skills}
            handleAttributeIncrement={handleAttributeIncrement}
            handleAttributeDecrement={handleAttributeDecrement}
            handleSaveCharacter={handleSaveCharacters}
            handleAddCharacter={handleAddCharacter}
            handleSkillDecrement={handleSkillDecrement}
            handleSkillIncrement={handleSkillIncrement}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
