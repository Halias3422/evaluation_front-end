export interface Photo {
  title: string;
  date: string;
  imageBig: {
    image: string;
    width: number;
    height: number;
  };
  imageSmall: {
    image: string;
    width: number;
    height: number;
  };
  category: string;
}

export interface DisplayedPhotos {
  category: string;
  photos: Photo[];
  column1: JSX.Element[];
  column2: JSX.Element[];
  column3: JSX.Element[];
}
