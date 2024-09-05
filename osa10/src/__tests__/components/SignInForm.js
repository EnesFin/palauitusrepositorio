import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../../components/SignInForm';

describe('SignInForm', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit  = jest.fn();

      render(<SignInForm onSubmit={onSubmit}/>);
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit).toHaveBeenCalledWith({
          username: 'kalle',
          password: 'password'
        }, expect.anything());
        
      });
    });
  });
});