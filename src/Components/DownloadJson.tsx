const downloadJson = (data: Record<string, string>) => {
   const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'db.json';
   a.click();
   URL.revokeObjectURL(url);
};

export default downloadJson;