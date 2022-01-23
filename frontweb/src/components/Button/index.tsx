import './styles.css';

type Props = {
  text: string;
};

const Button = function (props: Props) {
  const { text } = props;

  return (
    <button className="btn btn-primary">
      <h6>{text}</h6>
    </button>
  );
};

export default Button;
