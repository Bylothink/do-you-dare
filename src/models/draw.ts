export interface DrawData
{
    readonly cardId: number;
    readonly userId: number;
    readonly createDate: string;
}

export default class Draw implements DrawData
{
    public readonly cardId: number;
    public readonly userId: number;
    public readonly createDate: string;

    public constructor({ cardId, userId, createDate }: DrawData)
    {
        this.cardId = cardId;
        this.userId = userId;
        this.createDate = createDate;
    }
}
