export class Organisation {
    public _id: string;
    public name: string;
    public primaryContactName: string;
    public primaryContactEmail: string;

    public constructor(data: any = {}) {
        this.name = data.name || '';
        this.primaryContactName = data.primaryContactName || '';
        this.primaryContactEmail = data.primaryContactEmil || '';
    }
}
