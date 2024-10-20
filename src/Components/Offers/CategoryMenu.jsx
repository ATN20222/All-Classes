import React from "react";
import './CategoryMenu.css'; // Add your custom styles here

const CategoryMenu = ({ isOpen, onClose,ChangeSelectedCat  }) => {
  if (!isOpen) return null;

  const cats = [
    'all',
    'Fun',
    'Food',
    'Hotels',
    'Health & Beauty',
    'Retails & Services'
  ]

  return (
    <div className="category-menu-overlay" onClick={onClose}>
      <div className="category-menu" onClick={(e) => e.stopPropagation()}>
        <div className="category-header">Category</div>
        <ul className="category-list">
            {cats.map((cat)=>(
                <li onClick={()=>ChangeSelectedCat(cat)}>{cat}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu;
