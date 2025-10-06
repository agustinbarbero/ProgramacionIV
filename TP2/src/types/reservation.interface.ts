export interface Reservation{
    id:string
    customerName:string;
    customerEmail:string;
    partySize:number;
    reservationDate:string; //yyyy-mm-dd
    reservationTime:string; //hh:mm
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date; //para validar la cancelacion
}