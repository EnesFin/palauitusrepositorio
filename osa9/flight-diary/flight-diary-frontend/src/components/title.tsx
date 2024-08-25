interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <h3>{title}</h3>;
};

export default Title;
