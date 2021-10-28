export default class Card
{
    public readonly id: number;
    public readonly text: string;

    public constructor(id: number, text: string)
    {
        this.id = id;
        this.text = text;
    }
}
