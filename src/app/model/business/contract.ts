import {Customer} from "../accounts/customer";

export interface Contract{
    id :number;
    service_id: number;
    date: string;
    staff_id: number;
    report: string;
    state: string;
    carWash_id: number;
    carWash_name: string;

}
