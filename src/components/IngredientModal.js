export default function IngredientModal({ dish, onClose }) {
  if (!dish) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h3>{dish.name}</h3>
            <div style={{color:'#666'}}>{dish.description}</div>
          </div>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>

        <div style={{marginTop:12}}>
          <h4>Ingredients</h4>
          <div className="ingredient-list">
            {dish.ingredients && dish.ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient-item">
                • {ing.name} — {ing.quantity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
