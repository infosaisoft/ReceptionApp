export class SubBillData{
    tariff_name: string;
    service_name: string;

    constructor(tarName, servName){
        this.tariff_name = tarName;
        this.service_name = servName;
    }

}