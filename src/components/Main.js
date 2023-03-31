import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getMyInfo(), api.getServerCards()])
            .then(([data, items]) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
                setCards(items);
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__data">
                    <button className="profile__avatar-change" type="button" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                    </button>
                    <div className="profile__information">
                        <div className="profile__info">
                            <h1 className="profile__name">{userName}</h1>
                            <p className="profile__description">{userDescription}</p>
                        </div>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать профиль"
                            name="edit"></button>
                    </div>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить фото" name="add"></button>
            </section>
            <section className="photos">
                {cards.map((card) => (<Card card={card} key={card._id} onCardClick={onCardClick} />))}
            </section>
        </main>
    )
}

export default Main;