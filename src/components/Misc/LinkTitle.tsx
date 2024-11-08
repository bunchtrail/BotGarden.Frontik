import '@fortawesome/fontawesome-free/css/all.min.css';

interface LinkTitleProps {
  title: string;
  className?: string;
}

const LinkTitle = ({ title, className }: LinkTitleProps) => {
  return <i className={className}>{title}</i>;
};

export default LinkTitle;
