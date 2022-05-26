import { Semana } from './semana.model';
import { Horario } from './horario.model';
export interface Reserva{

    id?: number
    semana: Semana
    horario: Horario

}