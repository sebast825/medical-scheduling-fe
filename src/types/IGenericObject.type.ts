export interface IGenericObject{
   key:string;
   label: string;
   value?:string;
   formatValue ?: (value : any) => string;
}