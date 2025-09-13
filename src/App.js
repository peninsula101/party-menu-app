import { useMemo, useState } from 'react';
import './App.css';
import { dishes as allDishes } from './data/mockDishes';
import Filters from './components/Filters';
import DishList from './components/DishList';
import IngredientModal from './components/IngredientModal';

const CATEGORIES = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];

const computeCounts = (selectedIds) => {
  const counts = {};
  CATEGORIES.forEach(c => (counts[c] = 0));
  selectedIds.forEach(id => {
    const dish = allDishes.find(d => d.id === id);
    if (dish) counts[dish.mealType] = (counts[dish.mealType] || 0) + 1;
  });
  return counts;
}

const App = () => {
  const [activeCategory, setActiveCategory] = useState('STARTER');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegChecked, setVegChecked] = useState(false);
  const [nonVegChecked, setNonVegChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [modalDish, setModalDish] = useState(null);

  
  const filteredDishes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allDishes.filter(d => {
      if (d.mealType !== activeCategory) return false;

      if (vegChecked || nonVegChecked) {
        if (vegChecked && !nonVegChecked && d.type !== 'VEG') return false;
        if (!vegChecked && nonVegChecked && d.type === 'VEG') return false;
      }

      if (!term) return true;
      return d.name.toLowerCase().includes(term);
    });
  }, [activeCategory, searchTerm, vegChecked, nonVegChecked]);

  const selectedCountsByCategory = useMemo(() => {
    return computeCounts(selectedIds, allDishes);
  }, [selectedIds]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="title">Party Menu Selection</div>
        <div className='title-2'>Selected Items: <strong>{selectedIds.length}</strong></div>
      </div>

      <div className="main-layout">
        <div className="left-pane">
          <Filters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            vegChecked={vegChecked}
            nonVegChecked={nonVegChecked}
            onVegChange={setVegChecked}
            onNonVegChange={setNonVegChecked}
            countsByCategory={selectedCountsByCategory}
          />

          <div className='left-count-container'>
            <div className='left-count-container-head'>Selected by category:</div>
            {CATEGORIES.map(cat => (
              <div key={cat} className='category-items'>
                <div>{cat}</div>
                <div className='count-number'>{selectedCountsByCategory[cat] || 0}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-pane">
          <DishList
            dishes={filteredDishes}
            onToggleSelect={toggleSelect}
            selectedIds={selectedIds}
            onViewIngredients={(dish) => setModalDish(dish)}
          />

          <div className="bottom-summary">
            <div>
              Total items selected: <strong>{selectedIds.length}</strong>
            </div>

            <div className='continue-container'>
              <button className="btn primary">Continue</button>
            </div>
          </div>
        </div>
      </div>

      <IngredientModal dish={modalDish} onClose={() => setModalDish(null)} />
    </div>
  );
}

export default App;
