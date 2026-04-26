import { useMemo, useState } from 'react';
import { removeProduct } from '../store/productsSlice';
import { useAppDispatch } from '../store/hooks';
import { Product } from '../types/product';

const useDeleteProductModal = (products: Product[]) => {
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteProduct = useMemo(
    () => products.find((product) => product.id === deleteId) ?? null,
    [deleteId, products]
  );

  const requestDelete = (id: string) => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(removeProduct(deleteId));
    }

    setDeleteId(null);
  };

  return {
    deleteId,
    deleteProduct,
    requestDelete,
    closeDeleteModal,
    confirmDelete,
    confirmText: deleteProduct ? `Вы действительно хотите удалить продукт "${deleteProduct.name}"?` : undefined,
  };
};

export default useDeleteProductModal;