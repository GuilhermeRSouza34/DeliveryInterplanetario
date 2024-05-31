import React, { useState } from 'react';
import './AddressList.css';

const AddressList = ({ addresses, onEdit, onDelete, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Shipping address');

  const handleSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleBlur = () => {
    setSelectedAddressId(null);
  };

  const filteredAddresses = addresses.filter(address =>
    address.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.addressLine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="address-list">
       <h2>Endereços</h2>
       <div className="filters">
        <button
          className={`filter-button ${selectedFilter === 'Shipping address' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('Shipping address')}
        >
          Endereço para envio
        </button>
        <button
          className={`filter-button ${selectedFilter === 'Billing address' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('Billing address')}
        >
          Endereço de Cobrança
        </button>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquisar endereços..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-address-button" onClick={() => onEdit()}>Adicionar Endereço</button>
      </div>
      {filteredAddresses.map(address => (
        <div key={address.id} 
        className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
        onClick={() => handleSelect(address.id)}
        onBlur={handleBlur}
        tabIndex="0"
        >
          <div className="address-card-body">
            <div className="address-info">
              <div className="map-thumbnail">
              <iframe
                width="150"
                height="150"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address.addressLine + ', ' + address.city + ', ' + address.state + ', ' + address.zipCode)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title={`Map of ${address.addressLine}, ${address.city}, ${address.state}, ${address.zipCode}`}
              ></iframe>
              </div>
              <div className="address-details">
                <h3 className="address-label">{address.label}</h3>
                <p>{address.fullName}</p>
                <p>{address.mobilePhone}</p>
                <p>{address.addressLine}</p>
                {address.country === 'Earth' ? (
                  <p>{address.city}, {address.state}, {address.zipCode}, {address.country}</p>
                ) : (
                  <p>Lot: {address.zipCode}, Mars</p>
                )}
              </div>
            </div>
            <div className="address-actions">
              <button className="btn primary" onClick={() => onEdit(address)}>Editar</button>
              <button className="btn secondary" onClick={() => onDelete(address.id)}>Deletar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
