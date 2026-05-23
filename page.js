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
  { id: 9, name: 'Origin Coffee', suburb: 'Redfern', roasters: ['Single Origin', 'Five Senses'], address: '333 Redfern St, Redfern NSW', hours: '6:30am-4pm' },
  { id: 10, name: 'Marrickville Brew', suburb: 'Marrickville', roasters: ['Campos', 'Five Senses'], address: '444 Marrickville Rd, Marrickville NSW', hours: '7am-3:30pm' }
];

const ROASTERS = ['Paradox', 'Campos', "Toby's Estate", 'Single Origin', 'Five Senses'];

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    borderBottom: '1px solid #e5e7eb',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: '300',
    letterSpacing: '-0.02em',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  headerDesc: {
    fontSize: '14px',
    color: '#666666',
    margin: 0,
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  searchBox: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '24px',
    fontFamily: 'inherit',
  },
  filterSection: {
    marginBottom: '24px',
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
    display: 'block',
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  button: (selected) => ({
    padding: '8px 12px',
    fontSize: '14px',
    border: selected ? '1px solid #78350f' : '1px solid #d1d5db',
    backgroundColor: selected ? '#78350f' : '#ffffff',
    color: selected ? '#ffffff' : '#374151',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  cafeList: {
    display: 'grid',
    gap: '12px',
  },
  cafeCard: {
    padding: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s',
  },
  cafeName: {
    fontWeight: '500',
    fontSize: '16px',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  cafeSuburb: {
    fontSize: '14px',
    color: '#666666',
    margin: '0 0 12px 0',
  },
  roasterBadge: {
    display: 'inline-block',
    fontSize: '12px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '4px 8px',
    borderRadius: '4px',
    marginRight: '6px',
    marginBottom: '6px',
  },
  detailPanel: {
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '24px',
    backgroundColor: '#ffffff',
    marginTop: '24px',
  },
  detailTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  detailText: {
    fontSize: '14px',
    color: '#666666',
    margin: '12px 0 0 0',
  },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoasters, setSelectedRoasters] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const filteredCafes = useMemo(() => {
    return CAFES.filter(cafe => {
      const matchesSearch = cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cafe.suburb.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoaster = selectedRoasters.length === 0 ||
                            selectedRoasters.some(r => cafe.roasters.includes(r));
      return matchesSearch && matchesRoaster;
    });
  }, [searchTerm, selectedRoasters]);

  const toggleRoaster = (roaster) => {
    setSelectedRoasters(prev =>
      prev.includes(roaster)
        ? prev.filter(r => r !== roaster)
        : [...prev, roaster]
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>brewzi</h1>
          <p style={styles.headerDesc}>Discover where your favourite roasters are served</p>
        </div>
      </header>

      <main style={styles.main}>
        <input
          type="text"
          placeholder="Search cafés or suburbs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBox}
        />

        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>Filter by roaster</label>
          <div style={styles.filterButtons}>
            {ROASTERS.map(roaster => (
              <button
                key={roaster}
                onClick={() => toggleRoaster(roaster)}
                style={styles.button(selectedRoasters.includes(roaster))}
              >
                {roaster}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.cafeList}>
          {filteredCafes.length === 0 ? (
            <p style={{textAlign: 'center', color: '#999'}}>No cafés found</p>
          ) : (
            filteredCafes.map(cafe => (
              <div
                key={cafe.id}
                style={styles.cafeCard}
                onClick={() => setSelectedCafe(cafe)}
              >
                <h3 style={styles.cafeName}>{cafe.name}</h3>
                <p style={styles.cafeSuburb}>{cafe.suburb}</p>
                <div>
                  {cafe.roasters.map(roaster => (
                    <span key={roaster} style={styles.roasterBadge}>
                      {roaster}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedCafe && (
          <div style={styles.detailPanel}>
            <h2 style={styles.detailTitle}>{selectedCafe.name}</h2>
            <p style={styles.detailText}><strong>Suburb:</strong> {selectedCafe.suburb}</p>
            <p style={styles.detailText}><strong>Address:</strong> {selectedCafe.address}</p>
            <p style={styles.detailText}><strong>Hours:</strong> {selectedCafe.hours}</p>
            <p style={styles.detailText}>
              <strong>Roasters:</strong> {selectedCafe.roasters.join(', ')}
            </p>
            <button
              onClick={() => setSelectedCafe(null)}
              style={{marginTop: '16px', padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
            >
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
