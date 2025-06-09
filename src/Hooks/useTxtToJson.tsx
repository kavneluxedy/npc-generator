import { useState } from 'react';

const useTxtToJson = () => {
   const [jsonResult, setJsonResult] = useState<Record<string, string> | null>(null);
   const [error, setError] = useState<string | null>(null);

   const parseFile = (file: File) => {
      if (file.type !== 'text/plain') {
         setError('Le fichier doit être un .txt');
         return;
      }

      const reader = new FileReader();

      reader.onload = () => {
         const content = reader.result as string;
         const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
         const result: Record<string, string> = {};
         lines.forEach((line, i) => {
            result[i.toString()] = line;
         });
         setJsonResult(result);
         setError(null);
      };

      reader.onerror = () => {
         setError('Erreur lors de la lecture du fichier');
      };

      reader.readAsText(file);
   };

   return { jsonResult, error, parseFile };
}

export default useTxtToJson