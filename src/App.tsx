import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/header/header';
import { Landing } from './components/landing/landing';
import { Slider } from './components/slider/slider';
import { Animal } from './interfaces/animals';

function App() {
  const [item, setItem] = useState<number>(0);

  const list: Animal[] = [
    {
      species: 'Amur Leopard',
      age: 2,
      bio: 'Love snacks',
      url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg'
    },
    {
      species: 'Asiatic Lion',
      age: 8,
      bio: 'Love shrimps',
      url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
    },
    {
      species: 'Siberian Tiger',
      age: 9,
      bio: 'Hate Elefants',
      url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
    },
    {
      species: 'Brown Bear',
      age: 12,
      bio: 'Love salmon',
      url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg'
    },
  ]

  return (
    <div className="App">
      <Header></Header>
      <Landing animals={list} item={item}></Landing>
      <Slider onItem={(index: number) => setItem(index)} size={list.length}></Slider>
    </div>
  );
}

export default App;
