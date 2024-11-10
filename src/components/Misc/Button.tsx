interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = 'btn-primary',
  disabled = false,
  type = 'button',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {text || children}
    </button>
  );
};

export default Button;
