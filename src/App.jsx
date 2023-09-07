import React, {useState, useEffect} from 'react';
import { getGallery } from './services/postGallery';
import {Searchbar} from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import {AppDiv} from './App.styled'

export const App = () => {

 const [search, setSearch] = useState('');
 const [page, setPage] = useState(1);
 const [gallery, setGallery] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isShowModal, setIsShowModal] = useState(false);
 const [total_pages, setTotalPages] = useState(null);
 const [currentImg, setCurrentImg] = useState('');

useEffect(() => {
  if (!search) {
    return;
  }
   const fetchPosts = async () => {
     setIsLoading (true);
    try {
      const result = await getGallery(search, page);
     setIsLoading (false);
      console.log(result);
        setGallery(prev => [...prev, ...result.hits]);
        setTotalPages(Math.ceil(result.totalHits / 12));
    } catch (error) {
      alert(error.message);
    } finally {
       setIsLoading(false);
    }
  };

  fetchPosts();
}, [page, search]);

  const handlerFormSubmit = imgName => {
    setSearch(imgName); 
    setPage(1);
    setGallery([]);
  };


  const handleChangePage = () => {
    setPage(prev => prev + 1 );
  };

  const handleToggle = () => {
      setIsShowModal(prev => !prev);
    };

  const handleOpenModal = value => {
    setIsShowModal(true);
    setCurrentImg(value);
  };

    const isShowButton = gallery.length > 0 && !isLoading;
    const isHidden = total_pages === page;
    console.log(isHidden);
    return (
      <AppDiv>
        <Searchbar onSubmit={handlerFormSubmit} />

        <ImageGallery
          onClick={handleOpenModal}
          gallery={gallery}
        />
        {isLoading && <Loader />}
        {isShowButton ? (
          <Button onClick={handleChangePage} hidden={isHidden} />
        ) : null}
        {isShowModal && (
          <Modal currentImg={currentImg} onCloseModal={handleToggle} />
        )}
      </AppDiv>
    );
  };