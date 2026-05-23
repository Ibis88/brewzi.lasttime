'use client';

import { useState, useMemo } from 'react';

const CAFES = [
  { id: 1, name: 'Single Origin Espresso', suburb: 'Surry Hills', roasters: ['Paradox', "Toby's Estate"], address: '123 Crown St, Surry Hills NSW', hours: '6am-4pm' },
  { id: 2, name: 'Specialty Lab', suburb: 'Bondi', roasters: ['Campos', 'Paradox'], address: '456 Hall St, Bondi NSW', hours: '7am-5pm' },
  { id: 3, name: 'The Roastery Café', suburb: 'Redfern', roasters: ["Toby's Estate"], address: '789 Redfern St, Redfern NSW', hours: '8am-3:30pm' },
  { id: 4, name: 'Brew & Roast', suburb: 'Newtown', roasters: ['Campos', "Toby's Estate"], address: '321 King St, Newtown NSW', hours: '6:30am-4pm' },
  { id: 5, name: 'Espresso Bar Co', suburb: 'Marrickville', roasters: ['Paradox'], address: '654 Marrickville Rd, Marrickville NSW', hours: '7am-3:30pm' },
  { id: 6, name: 'Black Star Coffee', suburb: 'Surry Hills', roasters: ['Five Senses'], address: '987 Crown St, Surry Hills NSW', hours: '7am-4pm' },
  { id: 7, name: 'Two Birds One Stone', suburb: 'Bondi', roasters: ['Paradox', 'Campos'], address: '111 Gould St, Bondi NSW', hours: '6:30am-5pm' },
  { id: 8, name: 'Code Black Coffee', suburb: 'Newtown', roasters: ["Toby's Estate", 'Single Origin'], address: '222 King St, Newtown NSW', hours: '7am-4:30pm' },
];

const ROASTERS = ['Paradox', 'Campos', "Toby's Estate", 'Single Origin', 'Five Senses'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoasters, setSelectedRoasters] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const filteredCafes = useMemo(() => {
    return CAFES.filter(cafe => {
      const matchesSearch = cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) || cafe.suburb.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoaster = selectedRoasters.length === 0 || selectedRoasters.some(r => cafe.roasters.includes(r));
      return matchesSearch && matchesRoaster;
    });
  }, [searchTerm, selectedRoasters]);

  const toggleRoaster = (roaster) => {
    setSelectedRoasters(prev => prev.includes(roaster) ? prev.filter(r => r !== roaster) : [...prev, roaster]);
  };

  return (
    <div style={{minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '40px 20px', backgroundColor: '#f9f9f9'}}>
      <h1 style={{fontSize: '32px', marginBottom: '10px'}}>brewzi</h1>
      <p style={{color: '#666', marginBottom: '30px'}}>Discover where your favourite roasters are served</p>
      
      <input type="text" placeholder="Search cafés..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px'}} />
      
      <div style={{marginBottom: '20px'}}>
        <label style={{display: 'block', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555'}}>FILTER BY ROASTER</label>
        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
          {ROASTERS.map(roaster => (
            <button key={roaster} onClick={() => toggleRoaster(roaster)} style={{padding: '8px 12px', backgroundColor: selectedRoasters.includes(roaster) ? '#78350f' : '#fff', color: selectedRoasters.includes(roaster) ? '#fff' : '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer'}}>
              {roaster}
            </button>
          ))}
        </div>
      </div>

      <div style={{display: 'grid', gap: '12px'}}>
        {filteredCafes.length === 0 ? (
          <p style={{color: '#999'}}>No cafés found</p>
        ) : (
          filteredCafes.map(cafe => (
            <div key={cafe.id} onClick={() => setSelectedCafe(cafe)} style={{padding: '16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer'}}>
              <h3 style={{margin: '0 0 8px 0', fontSize: '16px'}}>{cafe.name}</h3>
              <p style={{margin: '0 0 10px 0', color: '#666', fontSize: '14px'}}>{cafe.suburb}</p>
              <div>{cafe.roasters.map(r => <span key={r} style={{display: 'inline-block', fontSize: '12px', backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '3px', marginRight: '6px'}}>{r}</span>)}</div>
            </div>
          ))
        )}
      </div>

      {selectedCafe && (
        <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px'}}>
          <h2 style={{margin: '0 0 15px 0'}}>{selectedCafe.name}</h2>
          <p><strong>Suburb:</strong> {selectedCafe.suburb}</p>
          <p><strong>Address:</strong> {selectedCafe.address}</p>
          <p><strong>Hours:</strong> {selectedCafe.hours}</p>
          <p><strong>Roasters:</strong> {selectedCafe.roasters.join(', ')}</p>
          <button onClick={() => setSelectedCafe(null)} style={{marginTop: '12px', padding: '8px 16px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Close</button>
        </div>
      )}
    </div>
  );
}
