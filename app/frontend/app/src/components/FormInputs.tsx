interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  maxLength,
}: FormInputProps) => (
  <div>
    <label htmlFor={id} className="block text-gray-900 font-semibold mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className="w-full px-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
    />
  </div>
);

export default FormInput;
