// App.js
import React, { useState } from 'react';
import AddressList from './components/AddressList';
import AddressForm from './components/AddressForm';
import './App.css';

const App = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  const handleEditAddress = (updatedAddress) => {
    setAddresses(addresses.map(address => address.id === updatedAddress.id ? updatedAddress : address));
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <div className="body">
        <h1>Delivery Interplanetário</h1>
      <div className="app-container">
        <div className="address-list-container">
          <AddressList 
            addresses={addresses} 
            onEdit={setEditingAddress} 
            onDelete={handleDeleteAddress}
            onPinClick={(address) => console.log('Pin clicked for', address)}
          />
        </div>
        <div className="address-form-container">
          <AddressForm 
            onSave={editingAddress ? handleEditAddress : handleAddAddress} 
            address={editingAddress} 
            onCancel={() => setEditingAddress(null)} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
