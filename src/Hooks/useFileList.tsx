import { useEffect, useState } from 'react';

interface FileMatch {
   fullName: string;
   prefix: string;
   name: string;
}

const useFileList = () => {
   const [files, setFiles] = useState<FileMatch[]>([]);

   useEffect(() => {
      const fetchFiles = async () => {
         try {
            const response = await fetch('/');
            const text = await response.text();

            // Create a temporary DOM element to parse the directory listing
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Get all links from the directory listing
            const links = Array.from(doc.getElementsByTagName('a'));

            // Filter and process matching files
            const matchingFiles = links
               .map(link => link.href)
               .filter(href => /\w{3}_name\.txt$/.test(href))
               .map(href => {
                  const fileName = href.split('/').pop() ?? '';
                  const [prefix] = fileName.split('_');
                  return {
                     fullName: fileName,
                     prefix: prefix,
                     name: fileName.replace('.txt', '')
                  };
               });

            setFiles(matchingFiles);
         } catch (error) {
            console.error('Error fetching file list:', error);
         }
      };

      fetchFiles();
   }, []);

   return files;
};

export default useFileList;