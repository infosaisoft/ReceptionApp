import { SubBillData } from "./sub-bill";

export class BillData{
    patient_name: string;
    patient_contact: string;
    //sub_bill: Array<SubBillData>;
    tariff_name: string;
    service_name: string;
    category: string;
    rate: number;
    add_charge: number;
    discount: number;
    net_amount: number;
    amount_paid: number;
    balance_amt: number;
    payment_mode: string;
}