import React, { useState } from 'react';
import axios from 'axios';

const AddEquipment = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image_url: '',
        price: '',
        quantity: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/equipment', formData);
            alert('Equipment added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add equipment.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} />
            <input name="image_url" placeholder="Image URL" onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
            <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
            <button type="submit">Add Equipment</button>
        </form>
    );
};

export default AddEquipment;