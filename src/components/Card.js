import React from "react";

function Card(props) {
    const { card, onCardClick } = props;

    function handleCardClick() {
        onCardClick(card);
    }
    return (
        <article className="card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <button className="card__delete-button" type="button" aria-label="Удалить фото"></button>
            <div className="card__caption">
                <h2 className="card__caption-text">{card.name}</h2>
                <div className="card__like-box">
                    <button className="card__like-button" type="button" aria-label="Поставить лайк" name="like"></button>
                    <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}
export default Card;