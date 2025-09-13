import DishCard from './DishCard';

export default function DishList({
  dishes,
  onToggleSelect,
  selectedIds,
  onViewIngredients
}) {
  if (!dishes.length) {
    return <div style={{padding:20}}>No dishes match your filters.</div>;
  }

  return (
    <div className="dish-list">
      {dishes.map(d => (
        <DishCard
          key={d.id}
          dish={d}
          isSelected={selectedIds.includes(d.id)}
          onToggleSelect={() => onToggleSelect(d.id)}
          onViewIngredients={() => onViewIngredients(d)}
        />
      ))}
    </div>
  );
}
