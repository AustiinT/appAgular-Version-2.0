

export interface Post{
    "idCentroBelleza": number;
    "nombreSalon": string;
    "descripcion": string;
    "imagen" : string;
    "direccion" :string;
    
}

export class PostUser{
     constructor(public idUsuario: number,
                public email: string,
                public celular: string,
                public password: string,
                public imagen: string
     ){
         
     }
}