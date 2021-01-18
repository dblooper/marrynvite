export class UpdateStatus {
    message: string;
    id: string;
    clientName: string;
    updateStatus: number;
    constructor(message: string, id:string, clientName: string, updateStatus:number) {
        this.message = message;
        this.id = id;
        this.updateStatus = updateStatus;
        this.clientName = clientName;
    }
}