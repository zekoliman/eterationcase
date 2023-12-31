import axios from 'axios';

export const fetchProducts = async (
  pageNumber: number,
  pageSize: number,
): Promise<any> => {
  try {
    const response = await axios.get(
      'https://5fc9346b2af77700165ae514.mockapi.io/products',
      {
        params: {
          page: pageNumber,
          limit: pageSize,
        },
      },
    );
    return response.data;
  } catch (e) {
    return {
      errorMessage: {
        title: 'Hata',
        description: 'Ürünler getirilirken bir hata oluştu',
      },
    };
  }
};
