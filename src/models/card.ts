export interface CardData
{
    readonly id: number;
    readonly text: string;
}

export default class Card implements CardData
{
    public static get Empty(): Card
    {
        return new Card({ id: 0, text: "" });
    }

    public readonly id: number;
    public readonly text: string;

    public constructor({ id, text }: CardData)
    {
        this.id = Number(id);
        this.text = text;
    }
}
