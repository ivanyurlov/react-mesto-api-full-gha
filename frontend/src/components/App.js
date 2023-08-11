import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../Auth';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import BurgerNavBar from './BurgerNavBar';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = React.useState(false);
  const [deleteCardConfirm, setDeleteCardConfirm] = React.useState({card: {}});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isBurgerNavBarOpen, setIsBurgerNavBarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
    .then(([currentUser, cardData]) => {
      setCurrentUser(currentUser);
      setCards(cardData);
    })
    .catch((error) => {
      console.error(`Ошибка при загрузке профиля и карточек: ${error}`);
    }); 
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConfirmationOpen(false)
    setIsInfoTooltipOpen(false);
    setIsBurgerNavBarOpen(false); 
    setSelectedCard({});
  }

  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function handleEscClose(event) {
        if(event.code === 'Escape') { 
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteConfirmation(card) {
    setIsPopupWithConfirmationOpen(true);
    setDeleteCardConfirm({card: card});
  }

  function showCheckResult() {
    setIsInfoTooltipOpen(true);
  }

  function handleBurgerButtonClick() {
    setIsBurgerNavBarOpen(true);
  }

  function successRegister() {
    setIsRegister(true);
  }

  function unsuccessRegister() {
    setIsRegister(false);
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    const isLiked = card.likes.some((i) => (i === currentUser._id));
    (!isLiked ? api.addLikeCard(card._id, jwt) : api.removeLikeCard(card._id, jwt))
    .then(newCard => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.error(`Ошибка при постановке или снятии лайка: ${error}`);
    })
  }
  
  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    api.handleDeleteCard(card._id, jwt)
    .then(() => {
      setCards((cards) => cards.filter((c) => (c._id !== card._id)));
      closeAllPopups();
    })
    .catch((error) => {
      console.error(`Ошибка при удалении карточки: ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(currentUser) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    api.editAvatar(currentUser.avatar, jwt)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении аватара: ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateUser({name, about}) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    api.editProfile({name, about}, jwt)
    .then((currentUser) => {
      setCurrentUser(currentUser);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении профиля: ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    api.addNewCard({name, link}, jwt)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((error) => {
      console.error(`Ошибка при добавлении новой карточки: ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function onSignOut() {
    setUserEmail('');
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    Auth.getContent(jwt)
    .then((res) => {
      if (!res) {
        return;
      }
      setUserEmail(res.email);
      setIsLoggedIn(true);
      navigate("/");
    })
    .catch((error) => {
      setIsLoggedIn(false);
      console.error(`Ошибка при проверке валидности токена: ${error}`);
    });
  }
 
  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
        {location.pathname === "/" && <BurgerNavBar 
          userEmail = {userEmail}
          onSignOut = {onSignOut}
          isOpen = {isBurgerNavBarOpen}
          onClose = {closeAllPopups} 
          />}
          <Header 
          userEmail = {userEmail}
          onSignOut = {onSignOut}
          onBurgerNavBar = {handleBurgerButtonClick}
          isOpen = {isBurgerNavBarOpen}
          />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={
                <Main
                  onEditAvatar = {handleEditAvatarClick}
                  onEditProfile = {handleEditProfileClick}
                  onAddPlaceClick = {handleAddPlaceClick}
                  onCardClick = {handleCardClick}
                  onCardLike = {handleCardLike}
                  cards = {cards}
                  onPopupWithConfirmationClick = {handleCardDeleteConfirmation}
                />
              } /> 
            } />
            <Route path="/sign-up" element={<Register 
              successRegister = {successRegister}
              unsuccessRegister = {unsuccessRegister}
              showCheckResult = {showCheckResult}
            />} />
            <Route path="/sign-in" element={<Login 
              unsuccessRegister = {unsuccessRegister}
              handleLogin = {() => setIsLoggedIn(true)}
              showCheckResult = {showCheckResult}
              setUserEmail = {setUserEmail}
            />} />
          </Routes>
          {location.pathname === "/" && <Footer />}
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            isLoading = {isLoading} 
            onClose={closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen = {isEditProfilePopupOpen}
            isLoading = {isLoading}
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
          />
          <AddPlacePopup
            isOpen = {isAddPlacePopupOpen}
            isLoading = {isLoading}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit} 
          />
          <PopupWithConfirmation
            isOpen = {isPopupWithConfirmationOpen}
            onClose = {closeAllPopups}
            onCardDelete = {handleCardDelete}
            card = {deleteCardConfirm.card}
            isLoading = {isLoading}
          />
          <ImagePopup
            card = {selectedCard}
            onClose = {closeAllPopups}
          />
          <InfoTooltip
            isRegister = {isRegister}
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;