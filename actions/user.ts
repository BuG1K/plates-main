const API_URL = 'http://155.212.160.171:1337/api';

const handler = async (filter: string) => {
  try {
    const res = await fetch(API_URL + filter, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Ошибка при получении данных: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { data: null };
  }
};

const getNewProducts = async () => {
  const { data } = await handler('/products?filters[isNewArrival][$eq]=true&pagination[limit]=4&populate=*')
  return data || null;
}

const getPopularProducts = async () => {
  const { data } = await handler('/products?filters[rating][$gte]=4.8&pagination[limit]=4&populate=*');
  return data || null;
}

const getContacts = async () => {
  const { data } = await handler('/contacts?id=1');
  return data || null;
}

const postOrder = async (orderData: any) => {
  try {
    const res = await fetch(API_URL + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: orderData }),
    });

    if (!res.ok) {
      throw new Error(`Ошибка при отправке заказа: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getCategories = async () => {
  const res = await handler('/categories?populate=*');
  const data = Array.isArray(res?.data) ? res.data : [];

  return [
    "Новинки",
    ...data.map(item => item.name),
    "Распродажа"
  ];
};

const getProducts = async () => {
  const { data } = await handler('/products?populate=*&pagination[limit]=1000');
  return data || null;
}

export {
  getNewProducts, getPopularProducts, getContacts, postOrder, getCategories,
  getProducts,
};