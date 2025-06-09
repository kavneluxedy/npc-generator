import { CSSProperties, useEffect, useState } from 'react';
import useNpc from '../Hooks/useNpc';
import svgFemale from '../img/female.svg';
import svgMale from '../img/male.svg';
import Gender from '../Types/EnumGender';
import { Npc } from '../Types/Npc';
import InputRange from './html-core/InputRange';
import NpcPresenter from './NpcPresenter';

const btnStyle: CSSProperties = { width: "150px", maxWidth: "100%" }
const imgStyle: CSSProperties = { backgroundColor: "#00055", width: "100%", height: "50px", margin: "2%" }

const NpcGenerator = () => {
   const [customAge, setCustomAge] = useState(false);
   const [customGender, setCustomGender] = useState(false);
   const [minAge, setMinAge] = useState(1);
   const [maxAge, setMaxAge] = useState(1000);
   const [gender, setGender] = useState<Gender>(Gender.NULL);
   const [choiceNb] = useState(5);
   const [regenerationTrigger, setRegenerationTrigger] = useState(0);

   const { npcs, isLoading, error } = useNpc(
      choiceNb,
      { min: minAge, max: maxAge },
      gender,
      regenerationTrigger
   );

   const [results, setResults] = useState<Npc[]>();

   const Generate = () => {
      setRegenerationTrigger(prev => prev + 1); // Incrémente le trigger pour forcer la regénération
      setResults(npcs);
   };

   const Reset = () => {
      setResults(undefined);
   };

   useEffect(() => {
      console.log("NpcGenerator gender => ", gender)
   }, [minAge, maxAge, customAge, customGender, gender])


   if (error) {
      return <div className="error">Error: {error}</div>;
   }

   return (
      <div>
         {!results && (
            <div>

               <label htmlFor="custom-age">Choose age range</label>
               <input
                  type="checkbox"
                  name="custom-age"
                  id="custom-age"
                  onChange={() => setCustomAge(!customAge)}
               />

               {customAge && (
                  <InputRange
                     id={"age"}
                     min={minAge}
                     max={maxAge}
                     setMin={setMinAge}
                     setMax={setMaxAge}
                  />
               )}

               <p>
                  <label htmlFor="custom-gender">Choose gender</label>
                  <input
                     type="checkbox"
                     name="custom-gender"
                     id="custom-gender"
                     onChange={() => setCustomGender(!customGender)}
                  />
               </p>

               {customGender &&
                  <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                     <button type="button" onClick={() => setGender(Gender.FEMME)}><img src={svgFemale} style={imgStyle} alt='Femme' /></button>
                     <button type="button" onClick={() => setGender(Gender.HOMME)}><img src={svgMale} style={imgStyle} alt='Homme' /></button>
                     {gender !== Gender.NULL && <b>Tout ceci est encore fort cassé mais tqt =D</b>}
                  </div>
               }

               {/* <select onChange={(e) => setGender(e.target.value as Gender)}>
                  <option value={Gender.NULL}>Hélico de combat V12</option>
                  <option value={Gender.FEMME}>Femme</option>
                  <option value={Gender.HOMME}>Homme</option>
               </select> */}
            </div>

         )}

         {/* {isLoading && <div className="loading" style={{ justifyContent: "center", display: "flex", width: "100vw", height: "100vh" }}>. . .</div>} */}

         {results && <NpcPresenter npcs={results} />}

         <div className="buttons" style={{ display: "flex" }}>
            <button
               type="button"
               value="generate"
               onClick={Generate}
               disabled={isLoading}
            >
               {isLoading ? 'Generating...' : 'Generate'}
            </button>

            <button
               type="button"
               value="reset"
               onClick={Reset}
               className="reset-button"
            >
               Reset
            </button>
         </div>

      </div >
   );
};

export default NpcGenerator;