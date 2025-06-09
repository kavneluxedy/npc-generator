import { useEffect, useState } from "react";
import Gender from "../Types/EnumGender";
import HeightEnum from "../Types/EnumHeight";
import { Npc } from "../Types/Npc";

interface NpcParameters {
   ageRange: {
      min: number;
      max: number;
   };
}

const useNpc = (choiceNb: number, ageRange: NpcParameters["ageRange"], genderParam: Gender, regenerationTrigger: number): { npcs: Npc[], isLoading: boolean, error: string | null } => {
   const [names, setNames] = useState<string[]>([]);
   const [npcs, setNpcs] = useState<Npc[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   let rng = Math.random() < 0.5 ? "female" : "male";
   const [gender] = useState(genderParam === Gender.NULL ? rng : genderParam);

   const getRandomName = () => {
      if (names.length <= 0) {
         throw new Error("Names state is empty");
      }
      const rng = Math.floor(Math.random() * names.length);
      return names[rng];
   };

   const getRandomAge = (min: number, max: number) => {
      let rng = Math.random() * (max - min) + min;
      return Math.floor(rng);
   }

   const getRandomHeight = (height: HeightEnum) => {
      const min = height * 0.85;
      const max = height * 1.05;
      const rng = Math.random() * (max - min + 1) + min;
      return rng.toFixed(2);
   }

   const getRandomWeight = (base: number) => {
      const min = base * 0.8;
      const max = base * 1.25;
      const rng = Math.random() * (max - min + 1) + min;
      return rng.toPrecision(2);
   }

   const generateNpcs = () => {
      try {
         const newNpcs: Npc[] = [];
         for (let i = 0; i < choiceNb; i++) {
            newNpcs.push({
               gender: gender,
               firstName: getRandomName(),
               lastName: '',
               height: getRandomHeight(HeightEnum.Medium),
               weight: getRandomWeight(70),
               age: getRandomAge(ageRange.min, ageRange.max)
            });
         }
         setNpcs(newNpcs);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Error generating NPCs');
      }
   };

   useEffect(() => {
      if (names.length > 0) {
         generateNpcs();
      }
   }, [names, regenerationTrigger]);

   useEffect(() => {
      const fetchNames = async () => {
         setIsLoading(true);
         setError(null);
         try {
            const fileName = gender ?? (Math.random() < 0.5 ? "male" : "female");
            const response = await fetch(`/data/${fileName}_name.txt`);
            if (!response.ok) {
               throw new Error(`Failed to fetch names: ${response.statusText}`);
            }
            const data = await response.text();
            const formattedNames = data
               .split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0); setNames(formattedNames);
         } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching names');
         } finally {
            setIsLoading(false);
         }
      };

      fetchNames();
   }, [choiceNb, ageRange.min, ageRange.max, genderParam]);

   return { npcs, isLoading, error };
};

export default useNpc;