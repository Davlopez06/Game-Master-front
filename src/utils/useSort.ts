export default function useSort(
  array: Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>,
  sort: string,
) {
  if (sort === 'A-Z')
    return array.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  if (sort === 'Z-A')
    return array.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });

    if (sort === '100-0') return array.sort((a, b) =>  b.rating - a.rating);

    if (sort === '0-100') return array.sort((a, b) => a.rating - b.rating );

  return array;
}
