export class CarOptions {
    configs!: {
      id: number;
      description: string;
      range: number;
      speed: number;
      price: number;
    }[];
  
    towHitch!: boolean;
    yoke!: boolean;
  }