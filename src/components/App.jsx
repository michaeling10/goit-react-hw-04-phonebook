import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localContacts = localStorage.getItem('contacts');
    return localContacts
      ? JSON.parse(localContacts)
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const namesList = contacts.map(contact =>
      contact.name.toLowerCase().trim()
    );

    const inputNameLowercased = name.toLowerCase().trim();

    if (namesList.includes(inputNameLowercased)) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { id: nanoid(), name, number };
      setContacts(contactsData => [...contactsData, newContact]);
    }
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const filterNames =
    filter.trim() === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );

  const deleteItem = key => {
    setContacts(prevContacs =>
      prevContacs.filter(contact => contact.id !== key)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} handleSearch={handleFilter} />
      <ContactList contacts={filterNames} deleteContact={deleteItem} />
    </div>
  );
};
