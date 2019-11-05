import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";

import { DataService } from '../../data.service';
import { Post } from '../../Posts';
import { PostUser } from '../../Posts';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: "app-index, demo-carousel-multilist",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.css"]  
 
})
export class IndexComponent implements OnInit, OnDestroy {
  title = 'Ubicacion';
  lat:number = 51.678418;
  lng:number = 7.809007; 
  zoom:number = 18;
  

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  textoABuscar: String = "";
  posts = [];
  
  name:string ='';
  nombreSalon:string;
  descripcion:string;
  direccion:string;
  imagen:string;
  found:boolean;

  
  

  onNamekeyUp(event:any){
    this.name = event.target.value;
    this.found = false;
  }
  searchData(){
    this.dataService.searchData(this.name).subscribe((data: Post[]) => {        
           this.posts=data;
           this.found=true;         
    
    });
    
    // this.httpClient.get('https://apiclione.azurewebsites.net/api/CentrosBelleza/ListAll/?nombreSalon*=${this.name} ').
    // subscribe(
    //   (data:any[]) =>{
    //     if (data.length){
    //       this.nombreSalon= data[0].nombreSalon;
    //       this.descripcion= data[0].descripcion;
    //       this.direccion= data[0].direccion;
    //       this.imagen= data[0].imagen;
    //       this.found=true;
    //     }
    //   }
    // )
    
  }
  PostUsers: PostUser[]  ;
  cols: any[];
  items: MenuItem[];
  constructor(private dataService: DataService, private httpClient: HttpClient ) {
    
    this.dataService.getData().subscribe(data =>{
      this.posts=data;
    })
    
  }
  getUser(){
    this.dataService.getUser().subscribe(
      (result: any)=>{
        let PostUsers: PostUser[]= [];
        for (let i = 0; i < result.length; i++) {
          let user = result[i] as PostUser; 
          PostUsers.push(user);         
        }
        this.PostUsers=PostUsers;
      },
      error=>{
        console.log(error);
      }
    )
  }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  showSaveDialog(){

  }

  ngOnInit() {
    
    this.getUser();
    this.cols =[      
      {field:  "src='{{imagen}}'", header:"Imagen"},
      {field: "idUsuario", header:"ID"},
      {field: "email", header:"Email"},
      {field: "celular", header:"Celular"},
    ];
    this.items=[
      
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
        command: () => this.showSaveDialog()
      },
      {
        label:"Editar",
        icon:"pi pi-fw pi-pencil"
      }
    ]
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

 
}
