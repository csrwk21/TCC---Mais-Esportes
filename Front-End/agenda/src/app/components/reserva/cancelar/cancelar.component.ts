import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.css']
})
export class CancelarComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute, private reservaService:ReservaService) { }

  reserva!: any;
  cancelar:any={
    novoStatus: "INATIVA"
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.reservaService.buscarReserva(id).subscribe(reserva =>{
      this.reserva = reserva;
      console.log(this.reserva);
    });
  }

  cancelReserva():void{
    var id = this.reserva.codigo;
    this.reservaService.cancelarReserva(id,this.cancelar).subscribe(()=>{
      this.reservaService.showMessage("Reserva cancelada!")
       this.router.navigate(['/'])
     })
   }
  cancel():void{
    this.router.navigate(['/'])
  }
}
