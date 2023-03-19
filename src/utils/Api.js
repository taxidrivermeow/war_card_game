export default class Api {
    static getNewDeck = async () => {
        return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(data => data.deck_id);
    }

    static getNewCardPair = async deckID => {
        return await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return [data.cards[0].code, data.cards[1].code, data.remaining];
            }
    );
    }
}