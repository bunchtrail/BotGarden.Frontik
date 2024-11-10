interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = 'btn-primary',
  disabled = false,
}) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
