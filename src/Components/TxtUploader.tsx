import useTxtToJson from '../Hooks/useTxtToJson';
import downloadJson from './DownloadJson';

const TxtUploader = () => {

   const { jsonResult, error, parseFile } = useTxtToJson();

   return (
      <>
         <div className="upload">
            <input type="file" accept=".txt" onChange={(e) => {
               const file = e.target.files?.[0];
               if (file) parseFile(file);
            }} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {jsonResult && (
               <pre>
                  {JSON.stringify(jsonResult).split('\n').slice(1, 5).join('\n')}
               </pre>
            )}
         </div>
         {jsonResult && (
            <>
               {/* <pre>{JSON.stringify(jsonResult, null, 2)}</pre> */}
               <button onClick={() => downloadJson(jsonResult)}>Télécharger le JSON</button>
            </>
         )}
      </>
   );
}

export default TxtUploader
