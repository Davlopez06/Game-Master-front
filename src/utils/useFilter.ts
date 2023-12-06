export default function useFilter(
    array: Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>,
    filter: string,
  ) {
    if (filter !== '')
      return array.filter(item => item.generos.includes(filter))

    return array;
  }
  