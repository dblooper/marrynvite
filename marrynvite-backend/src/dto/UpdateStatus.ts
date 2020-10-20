export class UpdateStatus {
    message: string;
    id: string;
    updateStatus: number;
    constructor(message: string, id:string, updateStatus:number) {
        this.message = message;
        this.id = id;
        this.updateStatus = updateStatus;
    }
}