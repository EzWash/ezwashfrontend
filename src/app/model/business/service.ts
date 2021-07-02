export interface Service{
  id: number
  name:string
  description:string
  is_promotion:number
  price:number
  details:string

  map(param: (o: any) => any): Service;
}
