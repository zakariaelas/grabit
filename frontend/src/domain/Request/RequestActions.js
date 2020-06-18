import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import snackbar from '../../components/Snackbar';

export const createOrder = async (order, history) => {
  try {
    await apiCall({
      method: 'POST',
      url: `${apiprefix}/orders`,
      data: order,
    });
    snackbar.success('Order created');
    history.push('/orders');
  } catch (err) {
    console.log(err.response);
    const error = err.response
      ? err.response.data.error
      : {
          error: {
            message: 'An error occurred, please try again later !',
          },
        };
    snackbar.error(error.message);
    console.log(error);
  }
};
