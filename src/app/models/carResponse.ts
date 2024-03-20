
export class CarResponse {
    code!: string;
    description!: string;
    colors!: {
      code: string,
      description: string,
      price: number
    }[]
  }
  