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
