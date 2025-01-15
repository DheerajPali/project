import React, { useState } from 'react';
import { useStore } from '../../lib/store';

const Categories = () => {
  const { categories, addCategory } = useStore();
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addCategory({
      name: newCategory.name,
      slug: newCategory.slug.toLowerCase().replace(/\s+/g, '-')
    });

    alert('Category added successfully!');
    setNewCategory({ name: '', slug: '' });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Categories</h1>
      
      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({
                ...newCategory,
                name: e.target.value,
                slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={newCategory.slug}
              onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Slug</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4">{category.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;