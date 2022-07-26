import React from 'react';
import styles from './Card.module.scss';

console.log(styles);

function Card({ title, imageUrl, price, onFavorite, onPlus }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavourite] = React.useState(false);

    const onClickPlus = () => {
        onPlus({ title, price, imageUrl });
        setIsAdded(!isAdded);
    };

    const onClickFavorite = () => {
        onFavorite({ title, imageUrl, price});
        setIsFavourite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked"></img>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"></img>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price}</b>
                </div>
                <img 
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} 
                alt="Plus">
                    
                </img>
            </div>
        </div>
    );
}

export default Card;