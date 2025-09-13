const categories = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];

export default function Filters({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  vegChecked,
  nonVegChecked,
  onVegChange,
  onNonVegChange,
  countsByCategory
}) {
  return (
    <div>
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat} ({countsByCategory[cat] || 0})
          </button>
        ))}
      </div>

      <input
        className="search"
        type="text"
        placeholder={`Search dishes in ${activeCategory}`}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />

      <div style={{marginTop:8}}>
        <div className="filter-row">
          <label>
            <input
              type="checkbox"
              checked={vegChecked}
              onChange={e => onVegChange(e.target.checked)}
            />{' '}
            Veg
          </label>

          <label style={{marginLeft:10}}>
            <input
              type="checkbox"
              checked={nonVegChecked}
              onChange={e => onNonVegChange(e.target.checked)}
            />{' '}
            Non-Veg
          </label>
        </div>
      </div>
    </div>
  );
}
