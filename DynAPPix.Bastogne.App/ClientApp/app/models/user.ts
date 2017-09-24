export class User {
    public _id: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public avatarUrl: string;
    public creationDate: string;
    public preferredLang: string;
    public connected = false;
    public password: string;
    public token: string;
    public expiryDate: Date;
    public provider: string;
    public organisation: string;
    public organisationNavigation: object;

    public constructor( data: any = {}) {
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.email = data.email || '';
        this.avatarUrl = data.avatarUrl || '';
        this.creationDate = data.creation_date || Date.now();
        this.preferredLang = data.preferredLang || null;
        this.connected = data.connected || false;
        this.password = data.password || '';
        this.token = data.token || '';
        this.expiryDate = data.expiryDate || new Date();
        this.provider = data.provider || '';
        this.organisation = data.organisation || '';
        this.organisationNavigation = data.organisationNavigation || null;
    }

    public getName() {
        return this.firstname + ' ' + this.lastname;
    }
}
