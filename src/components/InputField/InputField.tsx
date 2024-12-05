interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default InputField;
