import React from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="p-2 rounded-md outline-none border border-gray-300 w-full"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          onClick={toggleShowPassword}
        >
          {showPassword ? "👁️" : "🔒"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
