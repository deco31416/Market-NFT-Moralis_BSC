import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/login';
import Feed from './components/feed/feed';
import Sign from './components/sign/sign';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import { MarketContext } from "./context";
import { useState } from 'react';
import Password from './components/password/password';

function App() {

  /*const options = { chain: "bsc", address: "0xFE850B994eb489642CC49e26b7873D98dEaCf390" };
  const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);*/

  let initNfts = [
    { name: 'nft1', price: 10, unity: 'BNB' },
    { name: 'nft2', price: 1, unity: 'BNB' },
    { name: 'nft3', price: 17, unity: 'ETR' },
    { name: 'nft4', price: 100, unity: 'BTC' },
    { name: 'nft5', price: 15, unity: 'BNB' }
  ];

  const [nfts, setNfts] = useState(initNfts);

  let ntfsData = {
    initNfts,
    nfts,
    setNfts: (newNfts = initNfts) => setNfts(newNfts)
};

  return (
    <MarketContext.Provider value={ ntfsData }>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </MarketContext.Provider>
  )

}

export default App;
