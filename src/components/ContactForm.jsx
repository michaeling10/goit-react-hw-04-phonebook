import { useForm } from 'react-hook-form';
import './styles/ContactForm.css';

const ContactForm = ({ onAddContact }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onAddContact(data.name, data.number);
    reset();
  };

  return (
    <div>
      <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="input-name">
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', {
                pattern: {
                  value:
                    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                  message:
                    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
                },
              })}
              className={`${
                errors.name ? 'incorrect-name' : 'input-name-correct'
              }`}
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            {errors.name && <p className="incorrect">{errors.name.message}</p>}
          </div>
          <div className="input">
            <label className="label">Number</label>
            <input
              type="tel"
              {...register('number', {
                pattern: {
                  value:
                    /^\+?\d{1,4}([-.\s]?\d{1,3})?([-.\s]?\d{1,4})([-.\s]?\d{1,4})([-.\s]?\d{1,9})?$/,
                  message:
                    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
                },
              })}
              className={`${
                errors.number ? 'incorrect' : 'input-number-correct'
              }`}
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            {errors.number && (
              <p className="incorrect">{errors.number.message}</p>
            )}
          </div>
        </div>
        <input className="btn-submit" type="submit" value="Add contact" />
      </form>
    </div>
  );
};

export default ContactForm;
