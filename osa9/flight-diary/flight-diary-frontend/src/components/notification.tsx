interface NotificationProps {
  title: string;
}

const Notification = ({ title }: NotificationProps) => {
  return <h4 style={{ color: 'red' }}>{title}</h4>;
};
export default Notification;
