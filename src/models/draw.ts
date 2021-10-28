export default class Draw
{
    public readonly card: number;
    public readonly user: number;
    public readonly createDate: string;

    public constructor(card: number, user: number, createDate: string)
    {
        this.card = card;
        this.user = user;
        this.createDate = createDate;
    }
}
