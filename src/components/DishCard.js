export default function DishCard({ dish, isSelected, onToggleSelect, onViewIngredients }) {
  return (
    <div className={`dish-card ${isSelected ? 'selected' : ''}`}>
      <img className="dish-image" src={dish.image} alt={dish.name} />
      <div className="dish-body">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
          <div className="dish-name">{dish.name}</div>
          <div className="food-type">
            <span className={`food-dot ${dish.type === 'VEG' ? 'veg' : 'nonveg'}`}></span>
            {dish.type === 'VEG' ? 'Veg' : 'Non-Veg'}
         </div>
        </div>

        <div className="dish-desc">{dish.description}</div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button className="btn secondary" onClick={onViewIngredients}>Ingredients</button>

          <div className="card-footer" style={{borderTop:'none', padding:0}}>
            {isSelected ? (
              <>
                <span className="selected-badge">Added</span>
                <button className="btn primary" onClick={onToggleSelect}>Remove</button>
              </>
            ) : (
              <button className="btn primary" onClick={onToggleSelect}>Add</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
